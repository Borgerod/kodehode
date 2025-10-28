namespace Backend_Day2;

class Program
{
    static void Main(string[] args)
    {
        //* Print List Of Files - will get and print a list of all files from the current dir and its sub dir 
        LsCommand lsCommand = new LsCommand();
        lsCommand.LsImplementation();

        string input_file_name = "";
        GetUserInput getUserInput = new GetUserInput();
        input_file_name = getUserInput.AskForFileName();

        //* Print File information
        FileCommand fileCommand = new FileCommand();
        fileCommand.PrintFileinformation(input_file_name);
        
        //* Print File Content
        WriteToFile writeToFile = new WriteToFile();
        writeToFile.ReadFileContent(input_file_name);

        // TO SIMULATE A FAIL/CRASH
        // DontRunThis dontRunThis = new DontRunThis();
        // dontRunThis.SeriouslyDontRunThis();
    }
}