using System;
using System.Collections.Generic;
using System.Diagnostics;


public class SelectionTool
{

public int Select<T>(IReadOnlyList<T> entries, Func<T, string> formatEntry, Action? renderHeader = null, int initialIndex = 0, bool horizontal = false)
{
    if (entries is null) throw new ArgumentNullException(nameof(entries));
    if (formatEntry is null) throw new ArgumentNullException(nameof(formatEntry));
    if (entries.Count == 0) throw new ArgumentException("Selection list cannot be empty.", nameof(entries));

    int selectedIndex = Math.Clamp(initialIndex, 0, entries.Count - 1);
    ConsoleKey key;

    do
    {
        Console.Clear();
        renderHeader?.Invoke();

        if (horizontal)
            {   
            // Spacing before items
            Console.Write("   ");
            // render entries inline
            for (int i = 0; i < entries.Count; i++)
            {
                string label = formatEntry(entries[i]);
                string padded = $"  {label}   ";
                if (i == selectedIndex)
                {
                    Console.BackgroundColor = ConsoleColor.DarkBlue;
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write($"[{padded}]");
                    // Console.Write(padded);
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
            // existing vertical rendering
            for (int i = 0; i < entries.Count; i++)
            {
                string label = formatEntry(entries[i]);

                if (i == selectedIndex)
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
        //? This might be redundant now
        if (GetCallerMethodName() == "SelectDirAction")
            {
            Console.WriteLine("_________________________________");
        }

        key = Console.ReadKey(true).Key;

        if (horizontal)
        {
            if (key == ConsoleKey.LeftArrow) selectedIndex = selectedIndex == 0 ? entries.Count - 1 : selectedIndex - 1;
            else if (key == ConsoleKey.UpArrow) selectedIndex = selectedIndex == 0 ? entries.Count - 1 : selectedIndex - 1;
            else if (key == ConsoleKey.RightArrow) selectedIndex = selectedIndex == entries.Count - 1 ? 0 : selectedIndex + 1;
            else if (key == ConsoleKey.DownArrow) selectedIndex = selectedIndex == entries.Count - 1 ? 0 : selectedIndex + 1;
        }
        else
        {
            if (key == ConsoleKey.UpArrow) selectedIndex = selectedIndex == 0 ? entries.Count - 1 : selectedIndex - 1;
            else if (key == ConsoleKey.DownArrow) selectedIndex = selectedIndex == entries.Count - 1 ? 0 : selectedIndex + 1;
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
