export function AppHeader() {
    return (
      <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
        <div>
          <p className="text-sm font-medium text-foreground">Workspace</p>
          <p className="text-xs text-muted-foreground">
            Manage tasks and projects
          </p>
        </div>
  
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">Demo User</p>
            <p className="text-xs text-muted-foreground">demo@example.com</p>
          </div>
  
          <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-sm font-medium">
            D
          </div>
        </div>
      </header>
    );
  }