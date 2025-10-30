using System;
using System.Collections.Generic;
using System.Diagnostics;


public class SelectionTool
{

    public int Select<T>(IReadOnlyList<T> entries, Func<T, string> formatEntry, Action<int>? renderHeader = null, int initialIndex = 0, bool horizontal = false, bool headerSelectable = false, int headerItemCount = 0)
    {
        if (entries is null) throw new ArgumentNullException(nameof(entries));
        if (formatEntry is null) throw new ArgumentNullException(nameof(formatEntry));

        // headerItemCount: when headerSelectable==true this defines how many selectable slots the header occupies.
        int headerCount = headerSelectable ? Math.Max(1, headerItemCount) : 0;
        int totalSelectable = entries.Count + headerCount;
        if (totalSelectable == 0) throw new ArgumentException("Selection list cannot be empty.", nameof(entries));

        int selectedIndex = Math.Clamp(initialIndex, 0, totalSelectable - 1);
        ConsoleKey key;

        do
        {
            Console.Clear();
            Console.ResetColor();
            Console.SetCursorPosition(0, 0);

            // renderHeader receives the combined selectedIndex:
            // - if selectedIndex < headerCount: header region is selected and index indicates which header slot
            // - otherwise selectedIndex maps to entries: selectedIndex - headerCount
            renderHeader?.Invoke(selectedIndex);

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