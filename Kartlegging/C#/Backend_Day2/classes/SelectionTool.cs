using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;


public class SelectionTool
{

    public int Select<T>(IReadOnlyList<T> entries, Func<T, string> formatEntry, Action<int>? renderHeader = null, int initialIndex = 0, bool horizontal = false, bool headerSelectable = false, int headerItemCount = 0, bool renderWholeArea = false)
    {
        if (entries is null) throw new ArgumentNullException(nameof(entries));
        if (formatEntry is null) throw new ArgumentNullException(nameof(formatEntry));

        // headerItemCount: when headerSelectable==true this defines how many selectable slots the header occupies.
        int headerCount = headerSelectable ? Math.Max(1, headerItemCount) : 0;
        int totalSelectable = entries.Count + headerCount;
        if (totalSelectable == 0) throw new ArgumentException("Selection list cannot be empty.", nameof(entries));

        int selectedIndex = Math.Clamp(initialIndex, 0, totalSelectable - 1);
        ConsoleKey key;
        // track previous console width to detect resize events
    int prevConsoleWidth;
    try { prevConsoleWidth = Console.WindowWidth; } catch { prevConsoleWidth = 80; }

    // start a lightweight watcher task that clears the console when the window is resized
    var watcherStop = false;
    var watcher = Task.Run(() =>
    {
        int last = prevConsoleWidth;
        while (!watcherStop)
        {
            try
            {
                int cw = Console.WindowWidth;
                if (cw != last)
                {
                    last = cw;
                    try { Console.Clear(); } catch { }
                }
            }
            catch { }
            Thread.Sleep(150);
        }
    });

        void SafeConsoleClear()
        {
            try
            {
                Console.Clear();
                return;
            }
            catch (System.IO.IOException)
            {
                // swallow and fall back to manual clear
            }
            catch (ArgumentOutOfRangeException)
            {
                // swallow and fall back to manual clear
            }

            try
            {
                int width;
                try { width = Math.Max(1, Console.WindowWidth); }
                catch { width = 120; }

                int height;
                try { height = Math.Max(1, Console.WindowHeight); }
                catch { height = 30; }

                string blankLine = new string(' ', width);
                Console.SetCursorPosition(0, 0);
                for (int i = 0; i < height; i++)
                {
                    Console.Write(blankLine);
                }
                Console.SetCursorPosition(0, 0);
            }
            catch
            {
                // ignore secondary clearing failures to keep the input loop responsive
            }
        }

        do
        {
            // detect console width changes and clear so layout recalculates cleanly
            int curWidth;
            try { curWidth = Console.WindowWidth; } catch { curWidth = prevConsoleWidth; }
            if (curWidth != prevConsoleWidth)
            {
                try { Console.Clear(); } catch { }
                prevConsoleWidth = curWidth;
            }

            // Try to clear and reset cursor; on some terminals SetCursorPosition may fail after a resize
            try
            {
                Console.Clear();
                Console.ResetColor();
                Console.SetCursorPosition(0, 0);
            }
            catch
            {
                try { Console.Clear(); } catch { }
                try { Console.ResetColor(); } catch { }
            }
            SafeConsoleClear();
            Console.ResetColor();
            Console.SetCursorPosition(0, 0);

            // renderHeader receives the combined selectedIndex:
            // - if selectedIndex < headerCount: header region is selected and index indicates which header slot
            // - otherwise selectedIndex maps to entries: selectedIndex - headerCount
            renderHeader?.Invoke(selectedIndex);

            if (!renderWholeArea)
            {
                if (horizontal)
                {
                    Console.Write("   ");
                    for (int i = 0; i < entries.Count; i++)
                    {
                        int displayIndex = headerCount + i;
                        string label = formatEntry(entries[i]);
                        string padded = $" {label} ";
                        if (displayIndex == selectedIndex)
                        {
                            Console.BackgroundColor = ConsoleColor.DarkBlue;
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.Write($"[{padded}]");
                            Console.ResetColor();
                        }
                        else
                        {
                            Console.Write($" {padded} ");
                        }
                        Console.Write("     ");
                    }
                    Console.WriteLine();
                }
                else
                {
                    for (int i = 0; i < entries.Count; i++)
                    {
                        int displayIndex = headerCount + i;
                        string label = formatEntry(entries[i]);

                        if (displayIndex == selectedIndex)
                        {
                            Console.BackgroundColor = ConsoleColor.DarkBlue;
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.WriteLine($">     {label.TrimStart()}");
                            Console.ResetColor();
                        }
                        else
                        {
                            Console.WriteLine($"    {label}");
                        }
                    }
                }
            }

            // legacy behavior kept for SelectDirAction callers (optional divider)
            if (GetCallerMethodName() == "SelectDirAction")
            {
                Console.WriteLine("---------------------------------");
            }

            key = Console.ReadKey(true).Key;

            // Universal navigation across 0..totalSelectable-1
            if (key == ConsoleKey.LeftArrow)
            {
                // move left (wrap)
                selectedIndex = (selectedIndex - 1 + totalSelectable) % totalSelectable;
            }
            else if (key == ConsoleKey.RightArrow)
            {
                selectedIndex = (selectedIndex + 1) % totalSelectable;
            }
            else if (key == ConsoleKey.UpArrow)
            {
                // If we're on the first real item, jump to the leftmost header slot (0)
                // headerCount was computed earlier
                if (headerCount > 0 && selectedIndex == headerCount)
                {
                    selectedIndex = 0;
                }
                else
                {
                    selectedIndex = selectedIndex == 0 ? totalSelectable - 1 : selectedIndex - 1;
                }
            }
            else if (key == ConsoleKey.DownArrow)
            {
                selectedIndex = selectedIndex == totalSelectable - 1 ? 0 : selectedIndex + 1;
            }

    } while (key != ConsoleKey.Enter);

    // stop watcher cleanly
    try { watcherStop = true; watcher.Wait(200); } catch { }

    return selectedIndex;

        string GetCallerMethodName()
        {
            var thisType = typeof(SelectionTool);
            var st = new StackTrace();
            for (int i = 1; i < st.FrameCount; i++)
            {
                var m = st.GetFrame(i)?.GetMethod();
                if (m == null) continue;
                var decl = m.DeclaringType;
                if (decl == null) continue;
                if (decl != thisType) return m.Name;
            }
            return "<unknown>";
        }
    }

}