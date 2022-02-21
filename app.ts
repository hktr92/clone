// type aliasing
type AppArgs = string[];
type CommandCallback = any;

interface AppConstructorArgs {
  args: AppArgs;
}

interface AppCommand {
  help?: string;
  callback: CommandCallback;
}

interface AppCommandArgs extends AppCommand {
  name: string;
}

export class App {
  #args: AppArgs;
  #config: Record<string, string>;
  #defaultCommand?: AppCommand;

  readonly #commands: Record<string, AppCommand>;

  static from(args: AppArgs) {
    return new App({ args });
  }

  constructor({ args }: AppConstructorArgs) {
    this.#args = args;
    this.#commands = {};
    this.#config = {};
  }

  #help() {
    console.log(`${this.#config.name} ${this.#config.version}`);
    console.log(
      `Licensed under ${this.#config.license} by ${this.#config.author}`,
    );
    console.log();
    console.log(`Usage: ${this.#config.name}`);
    console.log();
    console.log(`Available commands:`);
    for (const command in this.#commands) {
      console.log(`\t${command}\t\t${this.#commands[command].help ?? ""}`);
    }
    console.log();
    console.log(`Available options:`);
    console.log(`\t--help\t\t\tprints help message`);
    console.log(`\t--version\t\tprints version info`);
  }

  config(config: Record<string, string>): App {
    this.#config = config;
    return this;
  }

  command({ name, callback, help }: AppCommandArgs): App {
    if (name === "default") {
      this.#defaultCommand = { callback, help };
      return this;
    }
    this.#commands[name] = { callback, help };
    return this;
  }

  parse(): App {
    if (this.#args.length === 0) {
      this.#help();
      return this;
    }

    const commandName = this.#args[0];
    const commandArgs = this.#args.slice(1);
    const command = this.#commands[commandName] ?? null;

    if (null === command || !this.#defaultCommand) {
      this.#help();
      return this;
    }

    if (this.#defaultCommand && !command) {
      this.#defaultCommand.callback(commandArgs);
      return this;
    }

    command.callback(commandArgs);

    return this;
  }

  test() {
    console.debug({
      "#args": this.#args,
      "#commands": this.#commands,
    });
  }
}
