public class WriteTo
{

    public void WriteContent(string name)
    {

        Console.WriteLine("Write changes:");
        var userInput = Console.ReadLine();
        File.WriteAllText(name, userInput);
    }

    public void ReadContent(string name)
    {
        if (Directory.Exists(name))
        {
            string originalDir = Environment.CurrentDirectory;
            try
            {
                Environment.CurrentDirectory = name;
                new LsCommand().LsImplementation();
            }
            finally
            {
                Environment.CurrentDirectory = originalDir;
            }
            return;
        }
        //? I dont think this is nessasary, how can i select select nothing? unless there are some deeper problems I suppose 
        // if (string.IsNullOrWhiteSpace(name))
        // {
        //     Console.WriteLine("No selection provided.");
        //     return;
        // }
        // if (!File.Exists(name))
        // {
        //     Console.WriteLine($"File '{name}' does not exist.");
        //     return;
        // }
        Console.WriteLine($"\n___________________________________________________________________________________________\n\n                                         FILE CONTENT                                      \n___________________________________________________________________________________________\n");
        Console.WriteLine($"{File.ReadAllText(name)}\n ");
    }
}
