public class LsCommand
{
    public void LsImplementation()
    {
        PrintDirectory("", true);
    }


    private void PrintDirectory(string indent, bool isRoot)
    {

        // Console.WriteLine("");
        string currentDir = Environment.CurrentDirectory;
        var dirInfo = new DirectoryInfo(currentDir);
        if (isRoot)
        {
            Console.WriteLine($"    {dirInfo.Name}/");
            indent += "        ";
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
        // Console.WriteLine($"\n");
        // Console.WriteLine($"");
    }

}
