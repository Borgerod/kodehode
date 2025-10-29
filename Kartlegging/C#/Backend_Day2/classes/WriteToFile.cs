public class WriteToFile
{
    public void WriteFileContent(string filePath)
    {
        Console.WriteLine("Write changes:");
        var userInput = Console.ReadLine();
        File.WriteAllText(filePath, userInput);
    }

    public void ReadFileContent(string filePath)
    {
        if (string.IsNullOrWhiteSpace(filePath))
        {
            Console.WriteLine("No filename provided.");
            return;
        }
        if (!File.Exists(filePath))
        {
            Console.WriteLine($"File '{filePath}' does not exist.");
            return;
        }
        Console.WriteLine($"\n___________________________________________________________________________________________\n\n                                         FILE CONTENT                                      \n___________________________________________________________________________________________\n");
        Console.WriteLine($"{File.ReadAllText(filePath)}\n ");
    }
}


// public class WriteToFile
// {
//     public void WriteFileContent(string filePath)
//     // public void WriteFileContent ( string filePath, string content)
//     {
//         Console.WriteLine("Write changes:");
//         var userInput = Console.ReadLine();
//         File.WriteAllText(filePath, userInput);
//     }

//     public void ReadFileContent(string filePath)
//     {
//         Console.WriteLine(File.ReadAllText(filePath));
//     }
// }


