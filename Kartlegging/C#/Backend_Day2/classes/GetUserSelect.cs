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

    // even if empty, we still show Exit (header action)
    var items = paths.Select(path =>
    {
        string name = Path.GetFileName(path);
        bool isDir = Directory.Exists(path);
        string displayName = isDir ? $"  |- {name}/" : $"  |- {name}";
        return (Path: path, Name: name, IsFolder: isDir, Display: displayName);
    }).ToList();

    // header has either [back, Exit] or [Exit] depending on history
    int headerCount = Navigation.CanGoBack() ? 2 : 1;

    // finalItems: filesystem entries (the selection tool will reserve headerCount slots at the start)
    var finalItems = new List<(string Path, string Name, bool IsFolder, string Display)>();
    finalItems.AddRange(items);

    // header renderer: selectedIndex is combined index:
    //   0..headerCount-1 => header sub-buttons
    //   headerCount.. => entries (header not selected)
    Action<int> renderHeader = (selectedIndex) =>
    {
    // Simple, reliable inline rendering without cursor positioning.
    // This mirrors the working style used for the [ open ] / back header.

        // Define inner labels (keep inner length equal so button sizes stay fixed)
        const string backInner = "  Back  "; // 8 chars
        const string exitInner = "  Exit  "; // 8 chars

        // Rendered forms: selected shows brackets around inner, unselected shows padded inner
        string leftSelected = $"[{backInner}]";   // length 10
        string leftUnselected = $" {backInner} "; // length 10
        string rightSelected = $"[{exitInner}]";  // length 10
        string rightUnselected = $" {exitInner} "; // length 10

        string leftRender, rightRender;
            if (Navigation.CanGoBack())
            {
            leftRender = selectedIndex == 0 ? leftSelected : leftUnselected;
            rightRender = selectedIndex == 1 ? rightSelected : rightUnselected;

            // Compute spacing so right button anchors to right edge and doesn't wrap.
            int consoleWidth;
            try { consoleWidth = Console.WindowWidth; } catch { consoleWidth = 80; }

            int leftCol = 0; // start at column 0 as requested
            // anchor right button to the right, leave 1-column margin
            int rightCol = Math.Max(0, consoleWidth - rightRender.Length - 1);

            // prepare a line buffer of consoleWidth (if too small, length at least rightRender length)
            int lineLength = Math.Max(consoleWidth, rightCol + rightRender.Length);
            var lineChars = new char[lineLength];
            for (int i = 0; i < lineChars.Length; i++) lineChars[i] = ' ';

            // copy left into buffer
            for (int i = 0; i < leftRender.Length && leftCol + i < lineChars.Length; i++) lineChars[leftCol + i] = leftRender[i];
            // copy right into buffer (this will overwrite if overlapping — keeps Exit intact)
            for (int i = 0; i < rightRender.Length && rightCol + i < lineChars.Length; i++) lineChars[rightCol + i] = rightRender[i];

            string full = new string(lineChars);

            // If buttons do not overlap, color only the selected segment cleanly using substrings
            if (leftCol + leftRender.Length <= rightCol)
            {
                if (selectedIndex == 0)
                {
                    Console.Write(full.Substring(0, leftCol));
                    Console.BackgroundColor = ConsoleColor.DarkBlue;
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write(full.Substring(leftCol, leftRender.Length));
                    Console.ResetColor();
                    Console.Write(full.Substring(leftCol + leftRender.Length));
                    Console.WriteLine();
                }
                else if (selectedIndex == 1)
                {
                    Console.Write(full.Substring(0, rightCol));
                    Console.BackgroundColor = ConsoleColor.DarkBlue;
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write(full.Substring(rightCol, rightRender.Length));
                    Console.ResetColor();
                    Console.Write(full.Substring(rightCol + rightRender.Length));
                    Console.WriteLine();
                }
                else
                {
                    Console.WriteLine(full);
                }
            }
            else
            {
                // Overlap case: fallback to sequential printing to guarantee Exit stays at right — print left then reposition and print right replacing overlap
                // Print left (possibly partially overwritten later)
                Console.Write(leftRender);
                // compute spaces until rightCol
                int curPos = leftRender.Length;
                if (rightCol > curPos)
                    Console.Write(new string(' ', rightCol - curPos));
                // print right with coloring if selected
                if (selectedIndex == 1)
                {
                    Console.BackgroundColor = ConsoleColor.DarkBlue;
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.Write(rightRender);
                    Console.ResetColor();
                }
                else
                {
                    Console.Write(rightRender);
                }
                Console.WriteLine();
            }
        }
        else
        {
            // Only Exit button (right aligned)
            rightRender = selectedIndex == 0 ? rightSelected : rightUnselected;
            int consoleWidth;
            try { consoleWidth = Console.WindowWidth; } catch { consoleWidth = 80; }
            int rightCol = Math.Max(3, consoleWidth - rightRender.Length - 3);
            string line = new string(' ', rightCol) + rightRender;
            if (selectedIndex == 0)
            {
                int before = rightCol;
                Console.Write(line.Substring(0, before));
                Console.BackgroundColor = ConsoleColor.DarkBlue;
                Console.ForegroundColor = ConsoleColor.White;
                Console.Write(line.Substring(before, rightRender.Length));
                Console.ResetColor();
                Console.WriteLine();
            }
            else
            {
                Console.WriteLine(line);
            }
        }

    Console.WriteLine();
        // print directory name under the action bar (no stray 'n')
        Console.WriteLine($"{Path.GetFileName(currentDir)}/");
        Console.WriteLine();
    };

    // start focus on first real item (combined index = headerCount)
    int startIndex = finalItems.Count > 0 ? headerCount : 0;

    // call select with headerItemCount so header occupies headerCount selectable slots (0..headerCount-1)
    int selectedIndex = selectionTool.Select(finalItems, item => item.Display, renderHeader, initialIndex: startIndex, horizontal: false, headerSelectable: true, headerItemCount: headerCount);

    // if a header slot was selected -> map directly to token (no secondary selector)
    if (selectedIndex < headerCount)
    {
        // when headerCount==2 and history exists: 0 => Back, 1 => Exit
        if (Navigation.CanGoBack())
        {
            if (selectedIndex == 0)
                return Navigation.TokenBack;
            // Exit selected: clear console before returning
            Console.Clear();
            return Navigation.TokenExit;
        }
        // when only Exit exists (headerCount==1) -> clear console then return
        Console.Clear();
        return Navigation.TokenExit;
    }

    // user selected a real item (map combined selectedIndex -> list index)
    var selected = finalItems[selectedIndex - headerCount];

    Console.Clear();
    Console.WriteLine($"You selected: {selected.Name}{(selected.IsFolder ? "/" : string.Empty)}");

    // return the actual path
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

        // headerCount == 1 (preview) so combined indices: 0 => preview, 1 => open, 2 => back
        int sel = selectionTool.Select(actions, action => $" {action.ToString().ToLowerInvariant()}", renderHeader, initialIndex: 1, horizontal: true, headerSelectable: true, headerItemCount: 1);

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

        // otherwise sel maps to actions[sel - headerCount] because header was selectable at indices 0..headerCount-1 (here headerCount==1)
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
// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;

// public enum DirAction { Preview, Open, Back }
// // public enum DirAction { Open, Back }
// public class GetUserSelect
// {
//     private readonly SelectionTool selectionTool = new SelectionTool();

//     public string SelectFileName()
//     {
//         string currentDir = Directory.GetCurrentDirectory();
//         List<string> paths = new List<string>();

//         // Get folders first, then files
//         paths.AddRange(Directory.GetDirectories(currentDir));
//         paths.AddRange(Directory.GetFiles(currentDir));

//         if (paths.Count == 0)
//         {
//             Console.WriteLine("No files or folders found in this directory.");
//             return string.Empty;
//         }

//         var items = paths.Select(path =>
//         {
//             string name = Path.GetFileName(path);
//             bool isDir = Directory.Exists(path);
//             string displayName = isDir ? $"  |- {name}/" : $"  |- {name}";
//             return (Path: path, Name: name, IsFolder: isDir, Display: displayName);
//         }).ToList();

//         Action<int> renderHeader = (selectedIndex) =>
//         {
//             Console.WriteLine("Current Directory:\n");
//             Console.WriteLine($"{Path.GetFileName(currentDir)}/n");
//         };

//         int selectedIndex = selectionTool.Select(items, item => item.Display, renderHeader);
//         var selected = items[selectedIndex];

//         Console.Clear();
//         Console.WriteLine($"You selected: {selected.Name}{(selected.IsFolder ? "/" : string.Empty)}");

//         // return full path (not tuple)
//         return selected.Path;
//     }
//     public DirAction SelectDirAction(string name)
//     {
//         //* Choice for when selected file is a dir/ --> what to do: (open dir) or (print info+content)
//         var dirCommand = new DirCommand();

//         // show a selectable header "preview" and only Open/Back as the selectable entries (horizontal)
//         var actions = new List<DirAction> { DirAction.Open, DirAction.Back };

//                 Action<int> renderHeader = (selectedIdx) =>
//         {
//             dirCommand.PrintDirInformation(name);
//             Console.WriteLine();

//             // preview area (centered-ish). when selectedIdx == 0 the header is selected
//             Console.WriteLine("---------------------------------");

//             // write leading spaces uncolored, color only the bracketed label
//             string preview_label = "   preview   ";
//             string indent = "         ";
//             Console.Write($"{indent}");
//             if (selectedIdx == 0)
//             {
//                 Console.BackgroundColor = ConsoleColor.DarkBlue;
//                 Console.ForegroundColor = ConsoleColor.White;
//                 Console.Write($"[{preview_label}]");
//                 Console.ResetColor();
//                 Console.WriteLine();
//             }
//             else
//             {
//                 // keep alignment identical when not selected
//                 Console.WriteLine($" {preview_label} ");
//             }

//             Console.WriteLine("---------------------------------");
//         };

//         // initialIndex: 1 -> default focus on "open"; headerSelectable: true so header is selectable as index 0
//         int sel = selectionTool.Select(actions, action => $" {action.ToString().ToLowerInvariant()}", renderHeader, initialIndex: 1, horizontal: true, headerSelectable: true);

//         // when header (0) chosen => show detailed preview, then show open/back (horizontal) while keeping preview visible
//         if (sel == 0)
//         {
//             // show preview and then present bottom choices; bottomHeader must render preview content so it survives Console.Clear()
//             Action<int> bottomHeader = (idx) =>
//             {
//                 dirCommand.PrintDirInformation(name);
//                 Console.WriteLine();
//                 Console.WriteLine("___Preview_______________________\n");
//                 dirCommand.PrintDirPreview(name); // print preview inside header so it's visible while selection loops
//                 Console.WriteLine("\n---------------------------------");
//             };

//             var bottom = new List<DirAction> { DirAction.Open, DirAction.Back };
//             int bottomIndex = selectionTool.Select(bottom, a => $" {a.ToString().ToLowerInvariant()}", bottomHeader, initialIndex: 0, horizontal: true);
//             Console.Clear();
//             return bottom[bottomIndex];
//         }

//         // otherwise sel maps to actions[sel-1] because header was selectable at index 0
//         Console.Clear();
//         return actions[sel - 1];
//     }
//     public DirAction SelectPreviewDirAction()
//     {
//         //* Choice for when selected file is a dir/ --> what to do: (open dir) or (print info/content)

//         var actions = new List<DirAction> { DirAction.Open, DirAction.Back };

//         Action<int> renderHeader = (idx) =>
//         {
//             Console.WriteLine("Choose what to do:");
//             Console.WriteLine();
//         };

//         // int selectedIndex = selectionTool.Select(actions, action => action.ToString().ToLowerInvariant(), renderHeader);
//         int selectedIndex = selectionTool.Select(actions, action => $"  {action.ToString().ToLowerInvariant()}", renderHeader);
//         DirAction selectedAction = actions[selectedIndex];

//         Console.Clear();
//         return selectedAction;
//     }
// }
