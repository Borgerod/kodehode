using System;
using System.Collections.Generic;

public class SelectionTool
{
    public int Select<T>(IReadOnlyList<T> entries, Func<T, string> formatEntry, Action? renderHeader = null, int initialIndex = 0)
    {
        if (entries is null)
        {
            throw new ArgumentNullException(nameof(entries));
        }

        if (formatEntry is null)
        {
            throw new ArgumentNullException(nameof(formatEntry));
        }

        if (entries.Count == 0)
        {
            throw new ArgumentException("Selection list cannot be empty.", nameof(entries));
        }

        int selectedIndex = Math.Clamp(initialIndex, 0, entries.Count - 1);
        ConsoleKey key;

        do
        {
            // TODO: this is problematic - it needs to be there to function, but it also removes the "preview" when i select preview.  
            Console.Clear();
            renderHeader?.Invoke();

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

            key = Console.ReadKey(true).Key;

            if (key == ConsoleKey.UpArrow)
            {
                selectedIndex = selectedIndex == 0 ? entries.Count - 1 : selectedIndex - 1;
            }
            else if (key == ConsoleKey.DownArrow)
            {
                selectedIndex = selectedIndex == entries.Count - 1 ? 0 : selectedIndex + 1;
            }

        } while (key != ConsoleKey.Enter);

        return selectedIndex;
    }
}
