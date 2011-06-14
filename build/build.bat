:: Contributed by devil1591
@echo off

:: Configuration
set VER=extensible-1.0
set DEPLOY_ROOT=C:\xampp\htdocs\ceaforms.com\subdomains\www\html\js\extCalendar
set EXTENSIBLE_ROOT=C:\Projects\Extensible
set EXTENSIBLE_OUTPUT=%EXTENSIBLE_ROOT%\deploy

:: Program start
echo.
IF NOT EXIST %EXTENSIBLE_ROOT%\NUL GOTO E_FOLDER_NOT_FOUND
IF "%1" == "-h" GOTO E_USAGE

echo %EXTENSIBLE_OUTPUT%

:: Build it
java -jar JSBuilder2.jar --projectFile %EXTENSIBLE_ROOT%\extensible.jsb2 --homeDir %EXTENSIBLE_OUTPUT%

:: Copy the deploy files back into dev so that the samples get the latest code
echo Updating dev...
xcopy "%EXTENSIBLE_OUTPUT%\%VER%\extensible-all.js" "%EXTENSIBLE_ROOT%" /H /Y
xcopy "%EXTENSIBLE_OUTPUT%\%VER%\extensible-all-debug.js" "%EXTENSIBLE_ROOT%" /H /Y
xcopy "%EXTENSIBLE_OUTPUT%\%VER%\resources\css\extensible-all.css" "%EXTENSIBLE_ROOT%\resources\css" /H /Y

echo Updating deploy...
xcopy "%EXTENSIBLE_OUTPUT%\%VER%\extensible-all.js" "%DEPLOY_ROOT%" /H /Y
xcopy "%EXTENSIBLE_OUTPUT%\%VER%\extensible-all-debug.js" "%DEPLOY_ROOT%" /H /Y
xcopy "%EXTENSIBLE_OUTPUT%\%VER%\resources\css\extensible-all.css" "%DEPLOY_ROOT%\css" /H /Y

:: Copy other resource files to output
REM xcopy "%EXTENSIBLE_ROOT%\*.textile" "%EXTENSIBLE_OUTPUT%\%VER%\" /H /Y
REM xcopy "%EXTENSIBLE_ROOT%\*.txt" "%EXTENSIBLE_OUTPUT%\%VER%\" /H /Y
REM xcopy "%EXTENSIBLE_ROOT%\*.html" "%EXTENSIBLE_OUTPUT%\%VER%\" /H /Y

IF "%1" == "-d" (
   echo Generating docs...
   java -jar ext-doc.jar -p extensible.xml -o %EXTENSIBLE_OUTPUT%\%VER%\docs -t template\ext\template.xml
)

echo All done!
goto EOF

:E_FOLDER_NOT_FOUND
echo The folder %EXTENSIBLE_ROOT% doesn't exist!
echo Please update build.bat with the correct path for EXTENSIBLE_ROOT
goto EOF

:E_USAGE
echo usage: build.bat [-d]
echo.
echo        -d: Include updated docs in the output

:EOF
echo.