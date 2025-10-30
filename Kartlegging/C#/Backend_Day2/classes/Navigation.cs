using System.Collections.Generic;

public static class Navigation
{
    private static readonly Stack<string> history = new();
    public static string Root { get; private set; } = "";
    public const string TokenBack = "__BACK__";
    public const string TokenExit = "__EXIT__";

    public static void Init(string root)
    {
        history.Clear();
        Root = root;
    }

    public static void Push(string path)
    {
        if (!string.IsNullOrEmpty(path))
            history.Push(path);
    }

    public static bool CanGoBack() => history.Count > 0;

    public static string? GoBack()
    {
        if (history.Count == 0) return null;
        return history.Pop();
    }
}