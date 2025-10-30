using System;
using System.Collections.Generic;
using System.Diagnostics;


public class SelectionTool
{

    public int Select<T>(IReadOnlyList<T> entries, Func<T, string> formatEntry, Action<int>? renderHeader = null, int initialIndex = 0, bool horizontal = false, bool headerSelectable = false)
    {
        if (entries is null) throw new ArgumentNullException(nameof(entries));
        if (formatEntry is null) throw new ArgumentNullException(nameof(formatEntry));
        int totalSelectable = entries.Count + (headerSelectable ? 1 : 0);
        if (totalSelectable == 0) throw new ArgumentException("Selection list cannot be empty.", nameof(entries));

        int selectedIndex = Math.Clamp(initialIndex, 0, totalSelectable - 1);
        ConsoleKey key;

        do
        {
            Console.Clear();
            // ensure no lingering colors or cursor state from previous loop
            Console.ResetColor();
            Console.SetCursorPosition(0, 0);

            // pass the selected index to header (0 meaning header selected when headerSelectable==true)
            renderHeader?.Invoke(selectedIndex);

            // ensure header block and controls are separated (prevents overlapping / visual duplication)
            // Console.WriteLine();

            if (horizontal)
            {
                // Spacing before items
                Console.Write("   ");
                // render entries inline; when headerSelectable==true entries map to indexes 1..Count
                for (int i = 0; i < entries.Count; i++)
                {
                    int displayIndex = headerSelectable ? i + 1 : i;
                    string label = formatEntry(entries[i]);
                    string padded = $"  {label}   ";
                    if (displayIndex == selectedIndex)
                    {
                        Console.BackgroundColor = ConsoleColor.DarkBlue;
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.Write($"[{padded}]");
                        Console.ResetColor();
                    }
                    else
                    {
                        Console.Write(padded);
                    }
                    // spacing between items
                    Console.Write("     ");
                }

                Console.WriteLine();
            }
            else
            {
                // existing vertical rendering; entries start at index 1 when headerSelectable == true
                for (int i = 0; i < entries.Count; i++)
                {
                    int displayIndex = headerSelectable ? i + 1 : i;
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

            // navigation logic across the selectable range
            if (horizontal)
            {
                // Left/Right move among entries (when headerSelectable the entries are 1..Count)
                if (key == ConsoleKey.LeftArrow)
                {
                    if (headerSelectable)
                    {
                        if (selectedIndex == 0) selectedIndex = entries.Count;
                        else if (selectedIndex == 1) selectedIndex = entries.Count;
                        else selectedIndex--;
                    }
                    else
                    {
                        selectedIndex = selectedIndex == 0 ? entries.Count - 1 : selectedIndex - 1;
                    }
                }
                else if (key == ConsoleKey.RightArrow)
                {
                    if (headerSelectable)
                    {
                        if (selectedIndex == 0) selectedIndex = 1;
                        else if (selectedIndex == entries.Count) selectedIndex = 1;
                        else selectedIndex++;
                    }
                    else
                    {
                        selectedIndex = selectedIndex == entries.Count - 1 ? 0 : selectedIndex + 1;
                    }
                }
                // Up/Down move through whole selectable range (including header if present)
                else if (key == ConsoleKey.UpArrow)
                {
                    selectedIndex = selectedIndex == 0 ? totalSelectable - 1 : selectedIndex - 1;
                }
                else if (key == ConsoleKey.DownArrow)
                {
                    selectedIndex = selectedIndex == totalSelectable - 1 ? 0 : selectedIndex + 1;
                }
            }
            else
            {
                // vertical: Up/Down move through whole selectable range (headerSelectable integrates naturally because displayIndex mapping)
                if (key == ConsoleKey.UpArrow) selectedIndex = selectedIndex == 0 ? totalSelectable - 1 : selectedIndex - 1;
                else if (key == ConsoleKey.DownArrow) selectedIndex = selectedIndex == totalSelectable - 1 ? 0 : selectedIndex + 1;
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
