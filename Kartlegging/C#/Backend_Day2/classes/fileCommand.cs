using System.IO; // Add this at the topusing System.IO; // Add this at the top
using Microsoft.Win32;

public class FileCommand
{

    // FileInfo? info; //? dont think i need this 

    public void PrintFileInformation(string fileName)
    {
        var info = new FileInfo(fileName);
        Console.WriteLine($"\n___Info____________________\n    name: {info.Name}\n    Type: {GetFileTypeDescription(info.Extension)}\n    Extension: {info.Extension}\n    Size: {GetReadableFileSize(info.Length)}\n    Created: {info.CreationTime}\n    Path: {info.FullName}\n___________________________");
        return;
    }
    public static string GetFileTypeDescription(string extension)
    {
        if (string.IsNullOrEmpty(extension))
            return "Unknown";
        // TODO: make it MacOS and Linux compatible
#pragma warning disable CA1416
        using var key = Registry.ClassesRoot.OpenSubKey(extension);
        var value = key?.GetValue("") as string;
        if (value == null) return extension.TrimStart('.');

        using var typeKey = Registry.ClassesRoot.OpenSubKey(value);
        return typeKey?.GetValue("") as string ?? extension.TrimStart('.');
    }

    // changed: make this public so other classes (DirCommand) can call it
    public static string GetReadableFileSize(long bytes)
    {
        string[] sizes = { "B", "KB", "MB", "GB", "TB" };
        if (bytes == 0) return "0 B";
        int order = (int)Math.Floor(Math.Log(bytes, 1024));
        double adjustedSize = bytes / Math.Pow(1024, order);
        return $"{adjustedSize:0.##} {sizes[order]}";
    }
}

