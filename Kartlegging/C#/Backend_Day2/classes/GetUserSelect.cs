using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public enum DirAction { Preview, Open, Back }
// public enum DirAction { Open, Back }
public class GetUserSelect
{
    private readonly SelectionTool selectionTool = new SelectionTool();

    public string SelectFileName()
    {
        string currentDir = Directory.GetCurrentDirectory();
        List<string> paths = new List<string>();

        // Get folders first, then files
        paths.AddRange(Directory.GetDirectories(currentDir));
        paths.AddRange(Directory.GetFiles(currentDir));

        if (paths.Count == 0)
        {
            Console.WriteLine("No files or folders found in this directory.");
            return string.Empty;
        }

        var items = paths.Select(path =>
        {
            string name = Path.GetFileName(path);
            bool isDir = Directory.Exists(path);
            string displayName = isDir ? $"  |- {name}/" : $"  |- {name}";
            return (Path: path, Name: name, IsFolder: isDir, Display: displayName);
        }).ToList();

        Action<int> renderHeader = (selectedIndex) =>
        {
            Console.WriteLine("Current Directory:\n");
            Console.WriteLine($"{Path.GetFileName(currentDir)}/n");
        };

        int selectedIndex = selectionTool.Select(items, item => item.Display, renderHeader);
        var selected = items[selectedIndex];

        Console.Clear();
        Console.WriteLine($"You selected: {selected.Name}{(selected.IsFolder ? "/" : string.Empty)}");

        // return full path (not tuple)
        return selected.Path;
    }
    public DirAction SelectDirAction(string name)
    {
        //* Choice for when selected file is a dir/ --> what to do: (open dir) or (print info+content)
        var dirCommand = new DirCommand();

        // show a selectable header "preview" and only Open/Back as the selectable entries (horizontal)
        var actions = new List<DirAction> { DirAction.Open, DirAction.Back };

                Action<int> renderHeader = (selectedIdx) =>
        {
            dirCommand.PrintDirInformation(name);
            Console.WriteLine();

            // preview area (centered-ish). when selectedIdx == 0 the header is selected
            Console.WriteLine("---------------------------------");

            // write leading spaces uncolored, color only the bracketed label
            string preview_label = "   preview   ";
            string indent = "         ";
            Console.Write($"{indent}");
            if (selectedIdx == 0)
            {
                Console.BackgroundColor = ConsoleColor.DarkBlue;
                Console.ForegroundColor = ConsoleColor.White;
                Console.Write($"[{preview_label}]");
                Console.ResetColor();
                Console.WriteLine();
            }
            else
            {
                // keep alignment identical when not selected
                Console.WriteLine($" {preview_label} ");
            }

            Console.WriteLine("---------------------------------");
        };

        // initialIndex: 1 -> default focus on "open"; headerSelectable: true so header is selectable as index 0
        int sel = selectionTool.Select(actions, action => $" {action.ToString().ToLowerInvariant()}", renderHeader, initialIndex: 1, horizontal: true, headerSelectable: true);

        // when header (0) chosen => show detailed preview, then show open/back (horizontal) while keeping preview visible
        if (sel == 0)
        {
            // show preview and then present bottom choices; bottomHeader must render preview content so it survives Console.Clear()
            Action<int> bottomHeader = (idx) =>
            {
                dirCommand.PrintDirInformation(name);
                Console.WriteLine();
                Console.WriteLine("___Preview_______________________\n");
                dirCommand.PrintDirPreview(name); // print preview inside header so it's visible while selection loops
                Console.WriteLine("\n---------------------------------");
            };

            var bottom = new List<DirAction> { DirAction.Open, DirAction.Back };
            int bottomIndex = selectionTool.Select(bottom, a => $" {a.ToString().ToLowerInvariant()}", bottomHeader, initialIndex: 0, horizontal: true);
            Console.Clear();
            return bottom[bottomIndex];
        }

        // otherwise sel maps to actions[sel-1] because header was selectable at index 0
        Console.Clear();
        return actions[sel - 1];
    }
    public DirAction SelectPreviewDirAction()
    {
        //* Choice for when selected file is a dir/ --> what to do: (open dir) or (print info/content)

        var actions = new List<DirAction> { DirAction.Open, DirAction.Back };

        Action<int> renderHeader = (idx) =>
        {
            Console.WriteLine("Choose what to do:");
            Console.WriteLine();
        };

        // int selectedIndex = selectionTool.Select(actions, action => action.ToString().ToLowerInvariant(), renderHeader);
        int selectedIndex = selectionTool.Select(actions, action => $"  {action.ToString().ToLowerInvariant()}", renderHeader);
        DirAction selectedAction = actions[selectedIndex];

        Console.Clear();
        return selectedAction;
    }
}
