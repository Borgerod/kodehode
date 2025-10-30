using System.IO; // Add this at the top
public class DirCommand
{

    // FileInfo? info; //? dont think i need this 

    public void PrintDirInformation(string name)
    {
        // Prints folder/dir info
        var dirInfo = new DirectoryInfo(name);
        FileCommand fileCommand = new FileCommand();
        long dirSize = GetDirectorySize(name);
        // Console.WriteLine($"\n___Dir Info________________\n   Name: {dirInfo.Name}\n   Type: Directory\n   Extension: /\n   Size: {FileCommand.GetReadableFileSize(dirSize)}\n   Created: {dirInfo.CreationTime}\n   Length: {dirInfo.GetFileSystemInfos().Length}\n___________________________");
        Console.WriteLine($"\n___Dir Info______________________\n   Name: {dirInfo.Name}\n   Type: Directory\n   Extension: /\n   Size: {FileCommand.GetReadableFileSize(dirSize)}\n   Created: {dirInfo.CreationTime}\n   Length: {dirInfo.GetFileSystemInfos().Length}\n_________________________________");
    }    
    public void PrintDirPreview(string name)
    {
        WriteTo writeTo = new WriteTo();
        writeTo.ReadContent(name);
    }

    public void EnterDir(string name)
    {
        // Prints folder/dir content
        // TODO recall main with root-one stop futher in. 
    }


    static long GetDirectorySize(string path)
    {
        return Directory.EnumerateFiles(path, "*", SearchOption.AllDirectories)
                        .Sum(file => new FileInfo(file).Length);
    }

}

