// ...existing code...
namespace Backend_Day2;

class Program
{
    static void Main(string[] args)
    {
        // initialize navigation root
        Navigation.Init(Environment.CurrentDirectory);

        while (true)
        {
            Console.Clear();
            string input_file_name;

            //* Print List Of Files - will get and print a list of all files from the current dir and its sub dir 
            LsCommand lsCommand = new LsCommand();
            lsCommand.LsImplementation();

            //* Get user input: SELECT
            GetUserSelect getUserSelect = new GetUserSelect();
            input_file_name = getUserSelect.SelectFileName();

            // handle special tokens
            if (input_file_name == Navigation.TokenExit)
            {
                break;
            }
            if (input_file_name == Navigation.TokenBack)
            {
                if (Navigation.CanGoBack())
                {
                    var prev = Navigation.GoBack();
                    if (!string.IsNullOrEmpty(prev))
                        Environment.CurrentDirectory = prev;
                }
                else
                {
                    Console.WriteLine("No previous directory in history. Press any key...");
                    Console.ReadKey(true);
                }
                continue; // restart loop with updated current directory
            }

            if (string.IsNullOrEmpty(input_file_name))
            {
                // nothing selected -> exit loop/app
                break;
            }

            //* Will redirect app behaviour based on file or folder 
            InputHandler inputHandler = new InputHandler();
            inputHandler.FileOrDirRedirection(input_file_name);
        }
    }
}
// ...existing code...

// namespace Backend_Day2;

// class Program
// {
//     static void Main(string[] args)
//     {
//         string input_file_name;

//         //* Print List Of Files - will get and print a list of all files from the current dir and its sub dir 
//         LsCommand lsCommand = new LsCommand();
//         lsCommand.LsImplementation();

//         //* Get user input: SELECT
//         GetUserSelect getUserSelect = new GetUserSelect();
//         input_file_name = getUserSelect.SelectFileName();

//         //* Will redirect app behaviour based on file or folder 
//         InputHandler inputHandler = new InputHandler();
//         inputHandler.FileOrDirRedirection(input_file_name);

//     }
// }