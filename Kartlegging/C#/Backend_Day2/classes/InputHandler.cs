using System.IO; // Add this at the top
public class InputHandler
{


    public void FileOrDirRedirection(string name)
    {
        // handle special navigation tokens first (defensive)
        if (name == Navigation.TokenBack)
        {
            if (Navigation.CanGoBack())
            {
                var prev = Navigation.GoBack();
                if (!string.IsNullOrEmpty(prev))
                    Environment.CurrentDirectory = prev;
            }
            else
            {
                Console.WriteLine("No previous directory in history.");
                Console.WriteLine("Press any key to continue...");
                Console.ReadKey(true);
            }
            return;
        }
        if (name == Navigation.TokenExit)
        {
            // nothing to do here — Program.Main handles exit token,
            // but keep defensive handling if this method ever receives it.
            Environment.Exit(0);
            return;
        }

        // will check if name == dir or file
        if (Directory.Exists(name))
        {
            // push current directory to history and change current directory to chosen directory
            Navigation.Push(Environment.CurrentDirectory);
            Environment.CurrentDirectory = name;
            return;
        }
        if (File.Exists(name))
        {
            var fileCommand = new FileCommand();
            fileCommand.PrintFileInformation(name);
            WriteTo writeTo = new WriteTo();
            writeTo.ReadContent(name);

            Console.WriteLine("\nPress any key to continue...");
            Console.ReadKey(true);
            return;
        }
        Console.WriteLine("Path does not exist.");
        Console.WriteLine("Press any key to continue...");
        Console.ReadKey(true);

    }


    private void OpenDirectory(string path)
    {
        // TODO: implement directory navigation
    }

}
// ...existing code...

// using System.IO; // Add this at the top
// using Microsoft.Win32;
// public class InputHandler
// {


//     public void FileOrDirRedirection(string name)
//     {
//         // will check if name == dir or file
//         if (Directory.Exists(name))
//         {
//             // is DIR -> redirect to dirCommand
//             // todo: make new selection input: OPEN dir or PRINT info+content

//             //> PLACEHOLDER: user select choice: OPEN / PRINT
//             GetUserSelect getUserSelect = new GetUserSelect();
//             DirAction selectedDirAction = getUserSelect.SelectDirAction(name);

//             // switch (selectedDirAction)
//             // {
//             //     case DirAction.Preview:
//             //         {
//             //             // DO: make the commands to print information and then preview (print content)
//             //             var dirCommand = new DirCommand();
//             //             dirCommand.PrintDirInformation(name);
//             //             dirCommand.PrintDirPreview(name);
//             //             // TODO: add selection: (go back) or (open)
//             //             // getUserSelect.SelectPreviewDirAction()
//             //             // DirAction selectedPreviewDirAction = getUserSelect.SelectPreviewDirAction();
//             //             break;
//             //         }
//             //     case DirAction.Open:
//             //         {
//             //             // DO: 
//             //             // open dir + repeat navigation
//             //             // e.g. call a method to open/iterate into the directory
//             //             OpenDirectory(name);
//             //             break;
//             //         }
//             //     case DirAction.Back:
//             //     default:
//             //         {
//             //             // return to caller / go back without action
//             //             break;
//             //         }
//             // }

//             return;
//         }
//         if (File.Exists(name))
//         {
//             var fileCommand = new FileCommand();
//             fileCommand.PrintFileInformation(name);
//             WriteTo writeTo = new WriteTo();
//             writeTo.ReadContent(name);
//         }
//         Console.WriteLine("Path does not exist.");

//     }


//     private void OpenDirectory(string path)
//     {
//         // TODO: implement directory navigation
//     }

// }


