using System.IO; // Add this at the top
using Microsoft.Win32;
public class InputHandler
{


    public void FileOrDirRedirection(string name)
    {
        // will check if name == dir or file
        if (Directory.Exists(name))
        {
            // is DIR -> redirect to dirCommand
            // todo: make new selection input: OPEN dir or PRINT info+content

            //> PLACEHOLDER: user select choice: OPEN / PRINT
            GetUserSelect getUserSelect = new GetUserSelect();
            DirAction selectedDirAction = getUserSelect.SelectDirAction();

            switch (selectedDirAction)
            {
                case DirAction.Preview:
                    {
                        // DO: make the commands to print information and then preview (print content)
                        var dirCommand = new DirCommand();
                        dirCommand.PrintDirInformation(name);
                        dirCommand.PrintDirPreview(name);
                        // TODO: add selection: (go back) or (open)
                        // getUserSelect.SelectPreviewDirAction()
                        DirAction selectedPreviewDirAction = getUserSelect.SelectPreviewDirAction();
                        break;
                    }
                case DirAction.Open:
                    {
                        // DO: 
                        // open dir + repeat navigation
                        // e.g. call a method to open/iterate into the directory
                        OpenDirectory(name);
                        break;
                    }
                case DirAction.Back:
                default:
                    {
                        // return to caller / go back without action
                        break;
                    }
            }

            return;
        }
        if (File.Exists(name))
        {
            var fileCommand = new FileCommand();
            fileCommand.PrintFileInformation(name);
            WriteTo writeTo = new WriteTo();
            writeTo.ReadContent(name);
        }
        Console.WriteLine("Path does not exist.");

    }


    private void OpenDirectory(string path)
    {
        // TODO: implement directory navigation
    }

}




// __________________BACKUP:

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
//             string selectedDirAction = getUserSelect.SelectDirAction();

//             switch (selectedDirAction)
//             {
//                 case "preview":
//                     {
//                         // DO: make the commands to print information and then preview (print content)
//                         var dirCommand = new DirCommand();
//                         dirCommand.PrintDirInformation(name);
//                         dirCommand.PrintDirPreview(name);
//                         break;
//                     }
//                 case "open":
//                     {
//                         // DO: 
//                         // open dir + repeat navigation
//                         // e.g. call a method to open/iterate into the directory
//                         OpenDirectory(name);
//                         break;
//                     }
//                 case "back":
//                 // GO BACK TO DIR
//                 default:
//                     Console.WriteLine("Unknown action");
//                     break;
//             }

//             return;
//         }
//         if (File.Exists(name))
//         {
//             var fileCommand = new FileCommand();
//             fileCommand.PrintFileInformation(name);
//             var info = new FileInfo(name);



//             string typeOfFile = GetFileTypeDescription(info.Extension);

//             Console.WriteLine($"\n___Info____________________\n    name: {info.Name}\n    Type: {typeOfFile}\n    Extension: {info.Extension}\n    Size: {GetReadableFileSize(info.Length)} bytes\n    Created: {info.CreationTime}\n    Path: {info.FullName}\n___________________________");
//             return;
//         }
//         Console.WriteLine("Path does not exist.");
//     }

//     static string GetFileTypeDescription(string extension)
//     {
//         if (string.IsNullOrEmpty(extension))
//             return "Unknown";

//         using var key = Registry.ClassesRoot.OpenSubKey(extension);
//         var value = key?.GetValue("") as string;
//         if (value == null) return extension.TrimStart('.');

//         using var typeKey = Registry.ClassesRoot.OpenSubKey(value);
//         return typeKey?.GetValue("") as string ?? extension.TrimStart('.');
//     }
//     static string GetReadableFileSize(long bytes)
//     {
//         string[] sizes = { "B", "KB", "MB", "GB", "TB" };
//         if (bytes == 0) return "0 B";
//         int order = (int)Math.Floor(Math.Log(bytes, 1024));
//         double adjustedSize = bytes / Math.Pow(1024, order);
//         return $"{adjustedSize:0.##} {sizes[order]}";
//     }

// }
