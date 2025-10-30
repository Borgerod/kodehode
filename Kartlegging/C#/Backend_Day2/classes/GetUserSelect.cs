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

        Action renderHeader = () =>
        {
            Console.WriteLine("Current Directory:");
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
        //* Choice for when selected file is a dir/ --> what to do: (open dir) or (print info/content)
        var dirCommand = new DirCommand();


        // var actions = new List<DirAction> { DirAction.Preview, DirAction.Open, DirAction.Back };

        var actions = new List<DirAction> { DirAction.Open, DirAction.Back};
        Action renderHeader = () =>
        {
            dirCommand.PrintDirInformation(name);
            dirCommand.PrintDirPreview(name);
            Console.WriteLine("_________________________________");
        };

        // int selectedIndex = selectionTool.Select(actions, action => $"  {action.ToString().ToLowerInvariant()}", renderHeader);
        int selectedIndex = selectionTool.Select(actions, action => $" {action.ToString().ToLowerInvariant()}", renderHeader, initialIndex: 0, horizontal: true);
        DirAction selectedAction = actions[selectedIndex];
        Console.Clear();
        
        return selectedAction;
    }

    public DirAction SelectPreviewDirAction()
    {
        //* Choice for when selected file is a dir/ --> what to do: (open dir) or (print info/content)

        var actions = new List<DirAction> { DirAction.Open, DirAction.Back };

        Action renderHeader = () =>
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

