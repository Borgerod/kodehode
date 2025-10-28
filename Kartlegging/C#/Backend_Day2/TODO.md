# TODO: 28.10.25

# Implement the LS command in C#

    * print out a list of all the files in a directory
    * Use the Path library to get all the file extensions

# Psuedocode examples

```cs
public class LsImplementation
{
    public List<string> allFiles = new List<string>();

    public void PrintAllFiles()
    {
        var fileNames = GetAllFilenames(allFiles);
        foreach(var file in fileNames)
        {
            Console.WriteLine(file);
        }
    }

    public string GetAllFilenames(List<string> fileNames)
    {
        return $"{string.join(". ", fileNames})";
    }

    public void GetFilenames(string filePath)
    {
        Path.GetFilename(filePath);
    }

    var openFile = GetFilenames("TODO.md");
}
```

```cs
public class DontRunThis
{
    public void SeriouslyDontRunIt()
    {
        int inf;
        while(true)
        {
            SeriouslyDontRunIt();
        }
    }
}

```
