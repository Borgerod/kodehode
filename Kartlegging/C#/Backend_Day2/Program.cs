namespace Backend_Day2;

class Program
{
    static void Main(string[] args)
    {
        string input_file_name;

        //* Print List Of Files - will get and print a list of all files from the current dir and its sub dir 
        LsCommand lsCommand = new LsCommand();
        lsCommand.LsImplementation();

        //* Get user input: SELECT
        GetUserSelect getUserSelect = new GetUserSelect();
        input_file_name = getUserSelect.SelectFileName();

        //* Will redirect app behaviour based on file or folder 
        InputHandler inputHandler = new InputHandler();
        inputHandler.FileOrDirRedirection(input_file_name);

    }
}