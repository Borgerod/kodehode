using System.IO; // Add this at the top
public class FileCommand
{

    // FileInfo? info; //? dont think i need this 

    public void PrintFileinformation(string fileName)
    {
        //TODO function: make userinput to get the file you want

        //gets metadata of file

        var info = new FileInfo(fileName);
        var extension = Path.GetExtension(fileName);
        string typeOfFile = "";

        var metaData = info!; //TEMP

         switch (extension)
        {
            case ".md":
                typeOfFile = "ASCII text file";
                break;
            case ".cs":
                typeOfFile = "C# source file";
                break;
            case ".txt":
                typeOfFile = "Plain Text file";
                break;
        }

        Console.WriteLine($"Filename: {fileName} \nType: {typeOfFile} \nExtension: {metaData.Extension}"); //TEMP
    }

}



//// *FASIT
// public class FileCommand
// {
//     public void PrintFileinformation(string fileName)
//     {
//         var extension = Path.GetExtension(fileName);

//         string typeOfFile = "";

//         switch (extension)
//         {
//             case ".md":
//                 typeOfFile = "ASCII text";
//                 break;
//             case ".cs":
//                 typeOfFile = "C# source file";
//                 break;
//             case ".txt":
//                 typeOfFile = "Plain text file";
//                 break;
//         }

//         Console.WriteLine($"Filename: {fileName} type of file: {typeOfFile} extension: {extension}");
//     }
// }