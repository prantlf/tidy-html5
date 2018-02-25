var tidy_html5_errors;

function tidy_html5_printErr(text) {
  tidy_html5_errors.push(text);
}

function tidy_html5(text, config) {
  tidy_html5_errors = [];
  // Pass the HTML input as an artificial file
  FS.writeFile("input.html", text);
  var cmdlineOptions = [];
  if (config) {
    for (var i in config) {
      // Options are passed without the "-" prefix
      cmdlineOptions.push("-" + i);
      // Boolean flkags are passed with value null
      var value = config[i];
      if (value != null && value !== true) {
        cmdlineOptions.push(String(value));
      }
    }
  }
  // Rewrite the input file buffer to be abel consume the tidied output
  // and prevent writing the tidied output to stdout
  cmdlineOptions.push("-m", "-q", "input.html");
  Module.callMain(cmdlineOptions);
  return {
    // Return the reported erorrs as an array of lines
    errors: tidy_html5_errors,
    // Return the output as string
    output: FS.readFile("input.html", {encoding:"utf8"})
  };
}

function tidy_html5_cleanup (status) {
  // Until emscripten does not offer to prevent the program exit,
  // this partial copy of their code is a workaround
  if (status == null) {
    status = 0;
  }
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;
  exitRuntime();
  if (Module["onExit"]) Module["onExit"](status);
  throw new ExitStatus(status);
}

var Module = {
  // Prevent the usual run of C main
  noInitialRun: true,
  // Prevent exiting and the end of main; it does snot actually work
  noExitRuntime: true,
  // Avoid exiting the process in tidy main
  preInit: function () {
    exit = Module["exit"] = function () {};
  },
  // Slurps error messages from stderr
  printErr: tidy_html5_printErr,
  // Main entry point
  tidy_html5: tidy_html5,
  // Call this instead of process.exit
  tidy_html5_cleanup: tidy_html5_cleanup
};
