using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public class GetUserSelect
{
    private readonly SelectionTool selectionTool = new SelectionTool();

    private sealed record Entry(string Path, string Name, bool IsDirectory, string Display);

    public string SelectFileName()
    {
        string currentDir = Directory.GetCurrentDirectory();
        var entries = GatherEntries(currentDir);

        int headerCount = Navigation.CanGoBack() ? 2 : 1;

        Action<int> render = selectedIndex =>
        {
            RenderLayout(currentDir, entries, selectedIndex, headerCount);
        };

        int startIndex = entries.Count > 0 ? headerCount : 0;
        int selectedIndex = selectionTool.Select(entries, e => e.Display, render, initialIndex: startIndex, headerSelectable: true, headerItemCount: headerCount, renderWholeArea: true);

        if (selectedIndex < headerCount)
        {
            if (Navigation.CanGoBack())
            {
                if (selectedIndex == 0)
                {
                    return Navigation.TokenBack;
                }
                Console.Clear();
                return Navigation.TokenExit;
            }

            Console.Clear();
            return Navigation.TokenExit;
        }

        var chosen = entries[selectedIndex - headerCount];
        Console.Clear();
        Console.WriteLine($"You selected: {chosen.Name}{(chosen.IsDirectory ? "/" : string.Empty)}");
        return chosen.Path;
    }

    private static List<Entry> GatherEntries(string currentDir)
    {
        var items = new List<Entry>();
        try
        {
            foreach (var path in Directory.GetDirectories(currentDir))
            {
                string name = Path.GetFileName(path);
                items.Add(new Entry(path, name, true, $"  |- {name}/"));
            }
        }
        catch { }

        try
        {
            foreach (var path in Directory.GetFiles(currentDir))
            {
                string name = Path.GetFileName(path);
                items.Add(new Entry(path, name, false, $"  |- {name}"));
            }
        }
        catch { }

        return items;
    }

    private static void RenderLayout(string currentDir, IReadOnlyList<Entry> entries, int selectedIndex, int headerCount)
    {
    int consoleWidth;
    try { consoleWidth = Console.WindowWidth; } catch { consoleWidth = 120; }
    if (consoleWidth < 60) consoleWidth = 60; // keep minimal width to avoid negative spacing
    int layoutWidth = Math.Max(40, consoleWidth - 1); // leave one column margin to avoid wrap

        // ensure background/foreground reset before drawing
        Console.ResetColor();

        bool showBack = Navigation.CanGoBack();
        int exitIndex = showBack ? 1 : 0;
        bool backSelected = showBack && selectedIndex == 0;
        bool exitSelected = selectedIndex == exitIndex;

    const string backDisplay = "[  Back  ]";
    const string exitDisplay = "[  Exit  ]";
    string backLabel = showBack ? backDisplay : string.Empty;
    string exitLabel = exitDisplay;

    WriteHeaderLine(layoutWidth, showBack, backLabel, exitLabel, backSelected, exitSelected);

        string directoryName = Path.GetFileName(currentDir) + "/";
    const int separatorWidth = 6; // two " | " separators
    int contentWidth = Math.Max(24 + 24 + 20, layoutWidth - separatorWidth);

    int leftWidth = Math.Max(24, contentWidth / 3);
    int infoWidth = Math.Max(24, contentWidth / 3);
    int previewWidth = Math.Max(20, contentWidth - leftWidth - infoWidth);
    previewWidth = Math.Max(12, previewWidth - 6); // make preview column thinner without growing others

        // ensure combined width including separators fits within console
        void ClampWidths()
        {
            int total = leftWidth + infoWidth + previewWidth;
            if (total <= contentWidth)
            {
                return;
            }

            int overflow = total - contentWidth;

            // shrink preview first (down to a reasonable minimum)
            int previewMin = 12;
            if (previewWidth > previewMin)
            {
                int reduce = Math.Min(overflow, previewWidth - previewMin);
                previewWidth -= reduce;
                overflow -= reduce;
            }

            if (overflow > 0 && infoWidth > 16)
            {
                int reduce = Math.Min(overflow, infoWidth - 16);
                infoWidth -= reduce;
                overflow -= reduce;
            }

            if (overflow > 0 && leftWidth > 16)
            {
                int reduce = Math.Min(overflow, leftWidth - 16);
                leftWidth -= reduce;
                overflow -= reduce;
            }

            // final guard: if overflow still remains, shave equally from columns where possible
            while (overflow > 0)
            {
                bool adjusted = false;
                if (previewWidth > 10)
                {
                    previewWidth--;
                    overflow--;
                    adjusted = true;
                }
                if (overflow > 0 && infoWidth > 12)
                {
                    infoWidth--;
                    overflow--;
                    adjusted = true;
                }
                if (overflow > 0 && leftWidth > 12)
                {
                    leftWidth--;
                    overflow--;
                    adjusted = true;
                }
                if (!adjusted)
                {
                    // nothing else we can trim safely
                    break;
                }
            }
        }

        ClampWidths();

    PrintCell(directoryName, leftWidth);
    Console.Write(" | ");
    PrintCell("  Info", infoWidth);
    Console.Write(" | ");
    PrintCell("  Preview", previewWidth);
        Console.WriteLine();

            var selectedEntry = GetSelectedEntry(entries, selectedIndex, headerCount);

            var leftLines = BuildLeftLines(entries, selectedEntry);
            var infoLines = BuildInfoLines(selectedEntry, infoWidth);

            int targetRows = Math.Max(leftLines.Count, infoLines.Count);
            var previewLines = BuildPreviewLines(selectedEntry, targetRows, previewWidth);

            targetRows = Math.Max(targetRows, previewLines.Count);

            NormalizeLength(leftLines, targetRows);
            NormalizeLength(infoLines, targetRows);
            NormalizeLength(previewLines, targetRows);

            int selectedEntryIndex = selectedIndex - headerCount;
            int selectedRow = selectedEntryIndex >= 0 ? 1 + selectedEntryIndex : -1; // line index in leftLines corresponding to selected entry

            for (int i = 0; i < targetRows; i++)
            {
                PrintCell(leftLines[i], leftWidth, highlight: i == selectedRow);
                Console.Write(" | ");
                PrintCell(infoLines[i], infoWidth);
                Console.Write(" | ");
                PrintCell(previewLines[i], previewWidth);
                Console.WriteLine();
            }
    }

    private static Entry? GetSelectedEntry(IReadOnlyList<Entry> entries, int selectedIndex, int headerCount)
    {
        int entryIndex = selectedIndex - headerCount;
        if (entryIndex >= 0 && entryIndex < entries.Count)
        {
            return entries[entryIndex];
        }
        return null;
    }

    private static List<string> BuildLeftLines(IReadOnlyList<Entry> entries, Entry? selectedEntry)
    {
        var lines = new List<string> { string.Empty };
        foreach (var entry in entries)
        {
            bool isSelected = selectedEntry != null && ReferenceEquals(entry, selectedEntry);
            string prefix = isSelected ? ">     |- " : "      |- ";
            string name = entry.Name + (entry.IsDirectory ? "/" : string.Empty);
            lines.Add(prefix + name);
        }

        if (lines.Count == 1)
        {
            lines.Add(string.Empty);
        }

        return lines;
    }

    private static List<string> BuildInfoLines(Entry? entry, int width)
    {
        var lines = new List<string> { string.Empty };
        if (entry == null)
        {
            return lines;
        }

        try
        {
            if (entry.IsDirectory)
            {
                var info = new DirectoryInfo(entry.Path);
                string extension = "/";
                long size = GetDirectorySizeSafe(entry.Path);
                int itemCount = GetDirectoryItemCountSafe(entry.Path);

                lines.Add($"Name: {info.Name}");
                lines.Add("Type: Directory");
                lines.Add($"Extension: {extension}");
                lines.Add($"Size: {FileCommand.GetReadableFileSize(size)}");
                lines.Add($"Created: {info.CreationTime:g}");
                foreach (var wrapped in WrapPath(info.FullName, width))
                {
                    lines.Add(wrapped);
                }
                lines.Add($"Length: {itemCount}");
            }
            else
            {
                var info = new FileInfo(entry.Path);
                string extension = info.Extension;
                string typeDescription = FileCommand.GetFileTypeDescription(extension);

                lines.Add($"Name: {info.Name}");
                lines.Add($"Type: {typeDescription}");
                lines.Add($"Extension: {extension}");
                lines.Add($"Size: {FileCommand.GetReadableFileSize(info.Length)}");
                lines.Add($"Created: {info.CreationTime:g}");
                foreach (var wrapped in WrapPath(info.FullName, width))
                {
                    lines.Add(wrapped);
                }
            }
        }
        catch
        {
            lines.Add("(info unavailable)");
        }

        return lines;
    }

    private static List<string> BuildPreviewLines(Entry? entry, int targetRows, int width)
    {
        var lines = new List<string> { string.Empty };
        if (entry == null || targetRows <= 1)
        {
            return lines;
        }

        int remaining = targetRows - 1;

        try
        {
            if (entry.IsDirectory)
            {
                var dirInfo = new DirectoryInfo(entry.Path);
                lines.Add(entry.Name + "/");

                remaining = targetRows - lines.Count;
                if (remaining <= 0)
                {
                    return lines;
                }

                var children = dirInfo.GetDirectories().Cast<FileSystemInfo>()
                    .Concat(dirInfo.GetFiles().Cast<FileSystemInfo>())
                    .ToList();

                int rendered = 0;
                foreach (var child in children)
                {
                    string label = $"  |- {child.Name}{(child is DirectoryInfo ? "/" : string.Empty)}";
                    lines.Add(label);
                    rendered++;
                    if (lines.Count >= targetRows)
                    {
                        break;
                    }
                }

                if (rendered < children.Count && lines.Count == targetRows)
                {
                    lines[targetRows - 1] = "  . . .";
                }
            }
            else
            {
                using var reader = new StreamReader(entry.Path);
                int lineNumber = 0;
                while (!reader.EndOfStream && lines.Count < targetRows)
                {
                    string? raw = reader.ReadLine();
                    raw ??= string.Empty;
                    lines.Add("  " + raw);
                    lineNumber++;
                }

                if (!reader.EndOfStream && lines.Count == targetRows)
                {
                    lines[targetRows - 1] = "  . . .";
                }
            }
        }
        catch
        {
            if (lines.Count < targetRows)
            {
                lines.Add("  (preview unavailable)");
            }
        }

        return lines;
    }

    private static void NormalizeLength(List<string> lines, int target)
    {
        if (lines.Count > target)
        {
            lines.RemoveRange(target, lines.Count - target);
        }
        while (lines.Count < target)
        {
            lines.Add(string.Empty);
        }
    }

    private static string PadOrClip(string text, int width)
    {
        if (width <= 0)
        {
            return string.Empty;
        }

        text ??= string.Empty;
        if (text.Length <= width)
        {
            return text.PadRight(width);
        }

        if (width <= 3)
        {
            return text.Substring(0, width);
        }

        return text.Substring(0, width - 3) + "...";
    }

    private static void PrintCell(string text, int width, bool highlight = false)
    {
    string cleaned = NormalizeCellText(text);
    string cell = PadOrClip(cleaned, width);
        if (highlight)
        {
            Console.BackgroundColor = ConsoleColor.DarkBlue;
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write(cell);
            Console.ResetColor();
        }
        else
        {
            Console.Write(cell);
        }
    }

    private static string NormalizeCellText(string? text)
    {
        if (string.IsNullOrEmpty(text))
        {
            return string.Empty;
        }

        Span<char> buffer = text.ToCharArray();
        for (int i = 0; i < buffer.Length; i++)
        {
            char c = buffer[i];
            if (c == '\t')
            {
                buffer[i] = ' ';
            }
            else if (char.IsControl(c) && c != '\n' && c != '\r')
            {
                buffer[i] = ' ';
            }
        }

        return new string(buffer);
    }

    private static IEnumerable<string> WrapPath(string fullPath, int width)
    {
        const string prefix = "Path: ";
        var lines = new List<string>();

        if (width <= 0)
        {
            lines.Add(string.Empty);
            return lines;
        }

        if (string.IsNullOrEmpty(fullPath))
        {
            lines.Add(PadOrClip(prefix, width));
            lines.Add(string.Empty);
            return lines;
        }

        if (width <= prefix.Length + 1)
        {
            lines.Add(PadOrClip(prefix + fullPath, width));
            lines.Add(string.Empty);
            return lines;
        }

        string normalized = fullPath.Replace(Path.AltDirectorySeparatorChar, Path.DirectorySeparatorChar);
        string indent = new string(' ', prefix.Length);
        string current = prefix;

        foreach (char rawChar in normalized)
        {
            char ch = rawChar;

            if (current.Length + 1 > width)
            {
                lines.Add(current);
                current = indent;
            }

            current += ch;
        }

        if (current.Trim().Length > 0)
        {
            lines.Add(current);
        }

        lines.Add(string.Empty);
        return lines;
    }

    private static void WriteHeaderLine(int consoleWidth, bool showBack, string backLabel, string exitLabel, bool backSelected, bool exitSelected)
    {
        int width = Math.Max(1, consoleWidth);
        string backRender = showBack ? FitLabel(backLabel, width) : string.Empty;
        string exitRender = FitLabel(exitLabel, width);

        int headerRow = Console.CursorTop;
        Console.SetCursorPosition(0, headerRow);
        Console.Write(new string(' ', width));

        if (showBack && backRender.Length > 0)
        {
            Console.SetCursorPosition(0, headerRow);
            WriteHeaderLabel(backRender, backSelected);
        }

        int exitStart = Math.Max(0, width - exitRender.Length);
        Console.SetCursorPosition(exitStart, headerRow);
        WriteHeaderLabel(exitRender, exitSelected);

        Console.SetCursorPosition(0, headerRow + 1);
        Console.WriteLine();
    }

    private static void WriteHeaderLabel(string text, bool highlight)
    {
        if (string.IsNullOrEmpty(text))
        {
            return;
        }

        if (highlight)
        {
            Console.BackgroundColor = ConsoleColor.DarkBlue;
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write(text);
            Console.ResetColor();
        }
        else
        {
            Console.Write(text);
        }
    }

    private static string FitLabel(string label, int maxWidth)
    {
        if (maxWidth <= 0 || string.IsNullOrEmpty(label))
        {
            return string.Empty;
        }

        if (label.Length <= maxWidth)
        {
            return label;
        }

        return label.Substring(0, maxWidth);
    }

    private static long GetDirectorySizeSafe(string path)
    {
        try
        {
            return Directory.EnumerateFiles(path, "*", SearchOption.AllDirectories)
                .Sum(file => new FileInfo(file).Length);
        }
        catch
        {
            return 0;
        }
    }

    private static int GetDirectoryItemCountSafe(string path)
    {
        try
        {
            return new DirectoryInfo(path).GetFileSystemInfos().Length;
        }
        catch
        {
            return 0;
        }
    }
}
