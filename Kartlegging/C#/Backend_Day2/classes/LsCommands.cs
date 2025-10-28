public class LsCommand
{
    public void LsImplementation()
    {
        PrintDirectory("", true);
    }


    // private void PrintDirectory(string path, string indent, bool isRoot)
    private void PrintDirectory(string indent, bool isRoot)
    {

        Console.WriteLine($"Current Directory:");

        string currentDir = Environment.CurrentDirectory;
        var dirInfo = new DirectoryInfo(currentDir);
        if (isRoot)
        {
            Console.WriteLine($"{dirInfo.Name}/");
            indent += "    ";
        }

        var directories = dirInfo.GetDirectories();
        var files = dirInfo.GetFiles();

        for (int i = 0; i < directories.Length; i++)
        {
            var isLast = (i == directories.Length - 1) && files.Length == 0;
            Console.WriteLine($"{indent}|- {directories[i].Name}/");
        }

        for (int i = 0; i < files.Length; i++)
        {
            var isLast = (i == files.Length - 1);
            Console.WriteLine($"{indent}|- {files[i].Name}");
        }
        Console.WriteLine($"\n");
    }
}


//* FASIT
// public class LsCommand
// {
//     // We can rather create the list inside Program.cs

//     public void PrintAllFiles(List<string> files)
//     {
//         foreach (var file in files)
//         {
//             Console.WriteLine(file);
//         }
//     }

//     public string GetAllFilenames(List<string> files)
//     {
//         return $"{string.Join(".", files)}";
//     }

//     public void LsImplementation()
//     {
//         // var directories = Directory.GetDirectories(".");
//         // var files = Directory.GetFiles("./");
//         // Console.WriteLine($"{string.Join(" ", directories)}");
//         // Console.WriteLine($"{string.Join(" ", files)}");


//         var directories = Directory.GetDirectories(".");
//         var files = Directory.GetFiles(".");

//         Console.WriteLine($"{string.Join(" ", directories.Select(Path.GetFileName))}");
//         Console.WriteLine($"{string.Join(" ", files.Select(Path.GetFileName))}");
//     }
// }

