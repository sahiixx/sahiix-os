# 101 Linux Commands — Quick Reference

> Extracted from 101 Linux Commands eBook (Bobby Iliev)

> Saved: 2026-04-20


## above

The above command will display the installed version of the curl
command.
@
B
l
a
c
The command k
h
yes
a
t
A
k



## above

The above command would copy all the files and directories from the
current folder on your server to your remote server.
Rundown of the command:
-a: is used to specify that you want recursion and want to preserve
the file permissions and etc.
-v: is verbose mode, it increases the amount of information you
are given during the transfer.
-z: this option, rsync compresses the file data as it is sent to the
destination machine, which reduces the amount of data being
transmitted -- something that is useful over a slow connection.
I recommend having a look at the following website which explains the
commands and the arguments very nicely:
https://explainshell.com/explain?cmd=rsync+-avz
@
B
l
a
c
In case that the SSH service on the remote server is not running on thke
h
standard 22 port, you could use rsync with a special SSH port:
a
t
A
k
rsync -avz -e 'ssh -p 1234' user@your-remote-
server.com:/home/user/dir/
@
B
l
a
c
Transfer Files remote server to local k
h
a
t
A
k
In some cases you might want to transfer files from your remote server
to your local server, in this case, you would need to use the following
syntax:
rsync -avz your-user@your-remote-server.com:/home/user/dir/
/home/user/local-dir/
Again, in case that you have a non-standard SSH port, you can use the
following command:
rsync -avz -e 'ssh -p 2510' your-user@your-remote-
server.com:/home/user/dir/ /home/user/local-dir/
@
B
l
a
c
Transfer only missing files k
h
a
t
A
k
If you would like to transfer only the missing files you could use the --
ignore-existing flag.
This is very useful for final sync in order to ensure that there are no
missing files after a website or a server migration.
Basically the commands would be the same apart from the appended --
ignore-existing flag:
rsync -avz --ignore-existing user@your-remote-
server.com:/home/user/dir/
@
B
l
a
c
Conclusion k
h
a
t
A
k
Using rsync is a great way to quickly transfer some files from one
machine over to another in a secure way over SSH.
For more cool Linux networking tools, I would recommend checking out
this tutorial here:
Top 15 Linux Networking tools that you should know!
Hope that this helps!
Initially posted here: How to Transfer Files from One Linux Server to
Another Using rsync
@
B
l
a
c
The command k
h
dig
a
t
A
k
dig - DNS lookup utility
The dig is a flexible tool for interrogating DNS name servers. It
performs DNS lookups and displays the answers that are returned from
the name server(s) that were queried.
Examples:
1. Dig is a network administration command-line tool for querying the
Domain Name System.
dig google.com
2. The system will list all google.com DNS records that it finds, along
with the IP addresses.
dig google.com ANY
Syntax:
dig [server] [name] [type] [q-type] [q-class] {q-opt}
{global-d-opt} host [@local-server] {local-d-opt}
[ host [@local-server] {local-d-opt} []]
@
B
l
a
c
k
Additional Flags and their Functionalities: h
a
t
A
k
domain is in the Domain Name System
q-class is one of (in,hs,ch,) [default: in]
q-type is one of
(a,any,mx,ns,soa,hinfo,axfr,txt,) [default:a]
(Use ixfr=version for type ixfr)
q-opt is one of:
-4 (use IPv4 query transport
only)
-6 (use IPv6 query transport
only)
-b address[#port] (bind to source
address/port)
-c class (specify query class)
-f filename (batch mode)
-k keyfile (specify tsig key file)
-m (enable memory usage
debugging)
-p port (specify port number)
-q name (specify query name)
-r (do not read ~/.digrc)
-t type (specify query type)
-u (display times in usec
instead of msec)
-x dot-notation (shortcut for reverse
lookups)
-y [hmac:]name:key (specify named base64
tsig key)
d-opt is of the form +keyword[=value], where
keyword is:
+[no]aaflag (Set AA flag in query
(+[no]aaflag))
+[no]aaonly (Set AA flag in query
(+[no]aaflag))
+[no]additional (Control display of
additional section)
+[no]adflag (Set AD flag in query
(default on))
+[no]all (Set or clear all display
flags)
+[no]answer (Control display of
answer section)
+[no]authority (Control display of
@
B
l
a
c
authority section)
k
+[no]badcookie (Retry BADCOOKIE h
a
responses)
t
+[no]besteffort (Try to parse even A
illegal messages) k
+bufsize[=###] (Set EDNS0 Max UDP packet
size)
+[no]cdflag (Set checking disabled
flag in query)
+[no]class (Control display of class
in records)
+[no]cmd (Control display of
command line -
global option)
+[no]comments (Control display of
packet header
and section name
comments)
+[no]cookie (Add a COOKIE option to
the request)
+[no]crypto (Control display of
cryptographic
fields in records)
+[no]defname (Use search list
(+[no]search))
+[no]dnssec (Request DNSSEC records)
+domain=### (Set default domainname)
+[no]dscp[=###] (Set the DSCP value to
### [0..63])
+[no]edns[=###] (Set EDNS version) [0]
+ednsflags=### (Set EDNS flag bits)
+[no]ednsnegotiation (Set EDNS version
negotiation)
+ednsopt=###[:value] (Send specified EDNS
option)
+noednsopt (Clear list of +ednsopt
options)
+[no]expandaaaa (Expand AAAA records)
+[no]expire (Request time to expire)
+[no]fail (Don't try next server on
SERVFAIL)
+[no]header-only (Send query without a
question section)
+[no]identify (ID responders in short
answers)
+[no]idnin (Parse IDN names
@
B
l
a
c
[default=on on tty])
k
+[no]idnout (Convert IDN response h
a
[default=on on tty])
t
+[no]ignore (Don't revert to TCP for A
TC responses.) k
+[no]keepalive (Request EDNS TCP
keepalive)
+[no]keepopen (Keep the TCP socket open
between queries)
+[no]mapped (Allow mapped IPv4 over
IPv6)
+[no]multiline (Print records in an
expanded format)
+ndots=### (Set search NDOTS value)
+[no]nsid (Request Name Server ID)
+[no]nssearch (Search all authoritative
nameservers)
+[no]onesoa (AXFR prints only one soa
record)
+[no]opcode=### (Set the opcode of the
request)
+padding=### (Set padding block size
[0])
+[no]qr (Print question before
sending)
+[no]question (Control display of
question section)
+[no]raflag (Set RA flag in query
(+[no]raflag))
+[no]rdflag (Recursive mode
(+[no]recurse))
+[no]recurse (Recursive mode
(+[no]rdflag))
+retry=### (Set number of UDP
retries) [2]
+[no]rrcomments (Control display of per-
record comments)
+[no]search (Set whether to use
searchlist)
+[no]short (Display nothing except
short
form of answers - global
option)
+[no]showsearch (Search with intermediate
results)
+[no]split=## (Split hex/base64 fields
@
B
l
a
c
into chunks)
k
+[no]stats (Control display of h
a
statistics)
t
+subnet=addr (Set edns-client-subnet A
option) k
+[no]tcflag (Set TC flag in query
(+[no]tcflag))
+[no]tcp (TCP mode (+[no]vc))
+timeout=### (Set query timeout) [5]
+[no]trace (Trace delegation down
from root [+dnssec])
+tries=### (Set number of UDP
attempts) [3]
+[no]ttlid (Control display of ttls
in records)
+[no]ttlunits (Display TTLs in human-
readable units)
+[no]unexpected (Print replies from
unexpected sources
default=off)
+[no]unknownformat (Print RDATA in RFC 3597
"unknown" format)
+[no]vc (TCP mode (+[no]tcp))
+[no]yaml (Present the results as
YAML)
+[no]zflag (Set Z flag in query)
global d-opts and servers (before host name) affect
all queries.
local d-opts and servers (after host name) affect only
that lookup.
-h (print help and exit)
-v (print version and exit)
@
B
l
a
c
The command k
h
whois
a
t
A
k



## bc

The bc command provides the functionality of being able to perform
mathematical calculations through the command line.
Examples:
1 . Arithmetic:
Input : $ echo "11+5" | bc
Output : 16
2 . Increment:
var –++ : Post increment operator, the result of the variable is
used first and then the variable is incremented.
– ++var : Pre increment operator, the variable is increased first
and then the result of the variable is stored.
Input: $ echo "var=3;++var" | bc
Output: 4
3 . Decrement:
var – – : Post decrement operator, the result of the variable is used
first and then the variable is decremented.
– – var : Pre decrement operator, the variable is decreased first
and then the result of the variable is stored.
@
B
l
a
c
k
Input: $ echo "var=3;--var" | bc
h
Output: 2 a
t
A
k
4 . Assignment:
var = value : Assign the value to the variable
var += value : similar to var = var + value
var -= value : similar to var = var – value
var *= value : similar to var = var * value
var /= value : similar to var = var / value
var ^= value : similar to var = var ^ value
var %= value : similar to var = var % value
Input: $ echo "var=4;var" | bc
Output: 4
5 . Comparison or Relational:
If the comparison is true, then the result is 1. Otherwise,(false),
returns 0
expr1<expr2 : Result is 1, if expr1 is strictly less than expr2.
expr1<=expr2 : Result is 1, if expr1 is less than or equal to expr2.
expr1>expr2 : Result is 1, if expr1 is strictly greater than expr2.
expr1>=expr2 : Result is 1, if expr1 is greater than or equal to
expr2.
expr1==expr2 : Result is 1, if expr1 is equal to expr2.
expr1!=expr2 : Result is 1, if expr1 is not equal to expr2.
Input: $ echo "6<4" | bc
Output: 0
@
B
l
a
c
k
Input: $ echo "2==2" | bc
h
Output: 1 a
t
A
k
6 . Logical or Boolean:
expr1 && expr2 : Result is 1, if both expressions are non-zero.
expr1 || expr2 : Result is 1, if either expression is non-zero.
! expr : Result is 1, if expr is 0.
Input: $ echo "! 1" | bc
Output: 0
Input: $ echo "10 && 5" | bc
Output: 1
Syntax:
bc [ -hlwsqv ] [long-options] [ file  ]
Additional Flags and their Functionalities:
Note: This does not include an exhaustive list of options.
Short
Long Flag Description
Flag
-i --interactive Force interactive mode
-l --mathlib Use the predefined math routines
Opens the interactive mode for bc without
-q --quiet
printing the header
-s --standard Treat non-standard bc constructs as errors
Provides a warning if non-standard bc
-w --warn
constructs are used
@
B
l
a
c
k
Notes: h
a
t
A
1. The capabilities of bc can be further appreciated if used within a
k
script. Aside from basic arithmetic operations, bc supports
increments/decrements, complex calculations, logical
comparisons, etc.
2. Two of the flags in bc refer to non-standard constructs. If you
evaluate 100>50 | bc for example, you will get a strange warning.
According to the POSIX page for bc, relational operators are only
valid if used within an if, while, or for statement.
@
B
l
a
c
The command k
h
df
a
t
A
k



## bzip2

The bzip2 command lets you compress and decompress the files i.e. it
helps in binding the files into a single file which takes less storage
space as the original file use to take.
Syntax:
bzip2 [OPTIONS] filenames 
Note : Each file is replaced by a compressed version of itself,
with the name original name of the file followed by extension
bz2.
Options and their Functionalities:
Option Alias Description
-d --decompress to decompress compressed file
-f --force to force overwrite an existing output file
-h --help to display the help message and exit
to enable file compression, doesn't deletes the
-k --keep
original input file
-L --license to display the license terms and conditions
-q --quiet to suppress non-essential warning messages
to check integrity of the specified .bz2 file, but
-t --test
don't want to decompress them
to display details for each compression
-v --erbose
operation
-V --version to display the software version
@
B
l
a
c
Option Alias Description k
h
to enable file compression, but deletes the
a
-z --compress
original input file t
A
k
By default, when bzip2 compresses a file, it deletes the original
(or input) file. However, if you don't want that to happen, use
the -k command line option.
Examples:
1. To force compression:
bzip2 -z input.txt
Note: This option deletes the original file also
2. To force compression and also retain original input file:
bzip2 -k input.txt
3. To force decompression:
bzip2 -d input.txt.bz2
4. To test integrity of compressed file:
bzip2 -t input.txt.bz2
5. To show the compression ratio for each file processed:
@
B
l
a
c
k
bzip2 -v input.txt
h
a
t
A
k
@
B
l
a
c
The command k
h
service
a
t
A
k
Service runs a System V init script in as predictable environment as
possible, removing most environment variables and with current
working directory set to /.
The SCRIPT parameter specifies a System V init script, located in
/etc/init.d/SCRIPT. The supported values of COMMAND depend on the
invoked script, service passes COMMAND and OPTIONS it to the init
script unmodified. All scripts should support at least the start and stop
commands. As a special case, if COMMAND is --full-restart, the script is
run twice, first with the stop command, then with the start command.
The COMMAND can be at least start, stop, status, and restart.
service --status-all runs all init scripts, in alphabetical order, with the
status command
Examples :
1. To check the status of all the running services:
service --status-all
2. To run a script
service SCRIPT-Name start
3. A more generalized command:
@
B
l
a
c
k
service [SCRIPT] [COMMAND] [OPTIONS]
h
a
t
A
k
@
B
l
a
c
The command k
h
vmstat
a
t
A
k



## cal

The cal command displays a formatted calendar in the terminal. If no
options are specified, cal displays the current month, with the current
day highlighted.
Syntax:
cal [general options] [-jy] [[month] year]
Options:
Option Description
-h Don't highlight today's date.
Specify a month to display. The month specifier is a full
month name (e.g., February), a month abbreviation of at
least three letters (e.g., Feb), or a number (e.g., 2). If you
-m month
specify a number, followed by the letter "f" or "p", the
month of the following or previous year, respectively,
display. For instance, -m 2f displays February of next year.
Specify a year to display. For example, -y 1970 displays
-y year
the entire calendar of the year 1970.
-3 Display last month, this month, and next month.
-1 Display only this month. This is the default.
Display num months occurring after any months already
specified. For example, -3 -A 3 displays last month, this
-A num month, and four months after this one; and -y 1970 -A 2
displays every month in 1970, and the first two months of
1971.
@
B
l
a
c
Option Description k
h
Display num months occurring before any months already
a
-B num specified. For example, -3 -B 2 displays the previous t
A
three months, this month, and next month.
k
-d YYYY- Operate as if the current month is number MM of year
MM YYYY.
Examples:
1. Display the calendar for this month, with today highlighted.
cal
2. Same as the previous command, but do not highlight today.
cal -h
3. Display last month, this month, and next month.
cal -3
4. Display this entire year's calendar.
cal -y
5. Display the entire year 2000 calendar.
cal -y 2000
6. Same as the previous command.
@
B
l
a
c
k
cal 2000
h
a
t
A
7. Display the calendar for December of this year. k
cal -m [December, Dec, or 12]
10. Display the calendar for December 2000.
cal 12 2000
@
B
l
a
c
The command k
h
bc
a
t
A
k



## cat

The cat command allows us to create single or multiple files, to view
the content of a file or to concatenate files and redirect the output to
the terminal or files.
The "cat" stands for 'concatenate.' and it's one of the most frequently
used commands in the Linux terminal.
Examples of uses:
1. To display the content of a file in terminal:
cat <specified_file_name>
2. To display the content of multiple files in terminal:
cat file1 file2 
3. To create a file with the cat command:
cat > file_name
4. To display all files in current directory with the same filetype:
@
B
l
a
c
k
cat *.<filetype>
h
a
t
A
5. To display the content of all the files in current directory: k
cat *
6. To put the output of a given file into another file:
cat old_file_name > new_file_name
7. Use cat command with more and less options:
cat filename | more
cat filename | less
8. Append the contents of file1 to file2:
cat file1 >> file2
9. To concatenate two files together in a new file:
cat file1_name file2_name merge_file_name
10. Some implementations of cat, with option -n, it's possible to show
line numbers:
cat -n file1_name file2_name > new_numbered_file_name
@
B
l
a
c
k
Syntax: h
a
t
A
k
cat [OPTION] [FILE]
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
-A --show-all equivalent to -vET
number nonempty output lines,
-b --number-nonblank
overrides -n
-e - equivalent to -vE
Display tab separated lines in file
-T -
opened with cat command.
-E - To show $ at the end of each file.
-E - Display file with line numbers.
-n --number number all output lines
-s --squeeze-blank suppress repeated empty output lines
-u - (ignored)
use ^ and M- notation, except for LFD
-v --show-nonprinting
and TAB
- --help display this help and exit
- --version output version information and exit
@
B
l
a
c
The command k
h
tac
a
t
A
k
tac is a Linux command that allows you to view files line-by-line,
beginning from the last line. (tac doesn't reverse the contents of each
individual line, only the order in which the lines are presented.) It is
named by analogy with cat.
Examples of uses:
1. To display the content of a file in terminal:
tac <specified_file_name>
2. This option attaches the separator before instead of after.
tac -b concat_file_name tac_example_file_name
3. This option will interpret the separator as a regular expression.
tac -r concat_file_name tac_example_file_name
4. This option uses STRING as the separator instead of newline.
tac -s concat_file_name tac_example_file_name
5. This option will display the help text and exit.
@
B
l
a
c
k
tac --help
h
a
t
A
6. This option will give the version information and exit. k
tac --version
Syntax:
tac [OPTION] [FILE]
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
attach the separator before instead of
-b --before
after
interpret the separator as a regular
-r --regex
expression
use STRING as the separator instead of
-s --separator=STRING
newline
- --help display this help and exit
- --version output version information and exit
@
B
l
a
c
The command k
h
head
a
t
A
k



## cd

The cd command is used to change the current working directory (i.e.,
in which the current user is working). The "cd" stands for "change
directory" and it is one of the most frequently used commands in the
Linux terminal.



## cd

The cd command is often combined with the ls command (see chapter
1) when navigating through a system, however, you can also press the
TAB key two times to list the contents of the new directory you just
changed to.
Examples of uses:
1. Change the current working directory:
cd <specified_directory_path>
2. Change the current working directory to the home directory:
cd ~
OR
cd
3. Change to the previous directory:
@
B
l
a
c
k
cd -
h
a
t
A
This will also echo the absolute path of the previous directory. k
4. Change the current working directory to the system's root
directory:
cd /
  Quick Tips
Adding a .. as a directory will allow you to move "up" from a folder:
cd ..
This can also be done multiple times! For example, to move up three
folders:
cd ../../../
Syntax:
cd [OPTIONS] directory
Additional Flags and Their Functionalities
Long
Short flag Description
flag
@
B
l
a
c
Long k
Short flag Description
h
flag
a
Follow symbolic links. By default,cd behaves as if t
-L - A
the -L option is specified. k
-P - Don’t follow symbolic links.
@
B
l
a
c
The command k
h
cat
a
t
A
k



## cp

The cp command requires at least two filenames in its
arguments.
Examples:
1. To copy the contents of the source file to the destination file.
cp sourceFile destFile
If the destination file doesn't exist then the file is created and the
content is copied to it. If it exists then the file is overwritten.
2. To copy a file to another directory specify the absolute or the
relative path to the destination directory.
cp sourceFile /folderName/destFile
3. To copy a directory, including all its files and subdirectories
cp -R folderName1 folderName2
The command above creates the destination directory and recursively
copies all files and subdirectories from the source to the destination
@
B
l
a
c
directory. k
h
a
If the destination directory already exists, the source directory itself and t
A
its content are copied inside the destination directory. k
4. To copy only the files and subdirectories but not the source
directory
cp -RT folderName1 folderName2
Syntax:
The general syntax for the cp command is as follows:
cp [OPTION] SOURCE DESTINATION
cp [OPTION] SOURCE DIRECTORY
cp [OPTION] SOURCE-1 SOURCE-2 SOURCE-3 SOURCE-n DIRECTORY
The first and second syntax is used to copy Source file to Destination
file or Directory. The third syntax is used to copy multiple Sources(files)
to Directory.
Some useful options
1. -i (interactive) i stands for Interactive copying. With this option
system first warns the user before overwriting the destination file.
cp prompts for a response, if you press y then it overwrites the file
and with any other option leave it uncopied.
$ cp -i file1.txt fileName2.txt
cp: overwrite 'file2.txt'? y
2. -b(backup) -b(backup): With this option cp command creates the
@
B
l
a
c
backup of the destination file in the same folder with the differenkt
h
name and in different format.
a
t
A
k
$ ls
a.txt b.txt
$ cp -b a.txt b.txt
$ ls
a.txt b.txt b.txt~
3. -f(force) If the system is unable to open destination file for writing
operation because the user doesn't have writing permission for this
file then by using -f option with cp command, destination file is
deleted first and then copying of content is done from source to
destination file.
$ ls -l b.txt
-r-xr-xr-x+ 1 User User 3 Nov 24 08:45 b.txt
User, group and others doesn't have writing permission.
Without -f option, command not executed
$ cp a.txt b.txt
cp: cannot create regular file 'b.txt': Permission denied
With -f option, command executed successfully
$ cp -f a.txt b.txt
@
B
l
a
c
k
Additional Flags and their Functionalities: h
a
t
A
Short
Long Flag Description k
Flag
-i --interactive prompt before overwrite
If an existing destination file cannot be opened,
-f --force
remove it and try again
Creates the backup of the destination file in the
-b - same folder with the different name and in
different format.
cp command shows its recursive behavior by
-r or
--recursive copying the entire directory structure
-R
recursively.
do not overwrite an existing file (overrides a
-n --no-clobber
previous -i option)
preserve the specified attributes (default:
-p - mode,ownership,timestamps), if possible
additional attributes: context, links, xattr, all
@
B
l
a
c
The command k
h
mv
a
t
A
k



## curl

The curl command comes with most of the Linux distributions. But, if
the system does not carry the curl by default. You need to install it
manually. To install the curl, execute the following commands:
Update the system by executing the following commands:
$ sudo apt update
$ sudo apt upgrade
Now, install the curl utility by executing the below command:
$ sudo apt install curl
Verify the installation by executing the below command:
$ curl -version



## df

The df command in Linux/Unix is used to show the disk usage &
information. df is an abbreviation for "disk free".
df displays the amount of disk space available on the file system
containing each file name argument. If no file name is given, the space
available on all currently mounted file systems is shown.
Syntax
df [OPTION] [FILE]
Options
Short
Long Flag Description
Flag
Include pseudo, duplicate,
-a --all
inaccessible file systems.
Scale sizes by SIZE before printing
them; e.g., -BM prints sizes in units of
-B --block-size=SIZE
1,048,576 bytes; see SIZE format
below.
Print sizes in powers of 1024 (e.g.,
-h --human-readable
1023M).
Print sizes in powers of 1000 (e.g.,
-H --si
1.1G).
List inode information instead of
-i --inodes
block usage.
-k - Like --block-size=1K.
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
-l --local Limit listing to local file systems. t
A
Do not invoke sync before getting k
- --no-sync
usage info (default).
Use the output format defined by
- --output[=FIELD_LIST] FIELD_LIST, or print all fields if
FIELD_LIST is omitted.
-P --portability Use the POSIX output format
Invoke sync before getting usage
- --sync
info.
Elide all entries insignificant to
- --total available space, and produce a grand
total.
Limit listing to file systems of type
-t --type=TYPE
TYPE.
-T --print-type Print file system type.
Limit listing to file systems not of
-x --exclude-type=TYPE
type TYPE.
Ignored; included for compatibility
-v -
reasons.
- --help Display help message and exit.
- --version Output version information and exit.
Examples:
1. Show available disk space Action: --- Output the available disk
space and where the directory is mounted
Details: --- Outputted values are not human-readable (are in bytes)
Command:
df
@
B
l
a
c
2. Show available disk space in human-readable form Action: --- k
h
Output the available disk space and where the directory is
a
t
mounted A
k
Details: --- Outputted values ARE human-readable (are in GBs/MBs)
Command:
df -h
3. Show available disk space for the specific file system Action: ---
Output the available disk space and where the directory is
mounted
Details: --- Outputted values are only for the selected file system
Command:
df -hT file_system_name
4. Show available inodes Action: --- Output the available inodes for
all file systems
Details: --- Outputted values are for inodes and not available space
Command:
df -i
5. Show file system type Action: --- Output the file system types
Details: --- Outputted values are for all file systems
Command:
@
B
l
a
c
k
df -T
h
a
t
A
6. Exclude file system type from the output Action: --- Output the k
information while excluding the chosen file system type
Details: --- Outputted values are for all file systems EXCEPT the chosen
file system type
Command:
df -x file_system_type
@
B
l
a
c
The command k
h
help
a
t
A
k



## dir

The dir command lists the contents of a directory(the current directory
by default). It differs from ls command in the format of listing the
content. By default, the dir command lists the files and folders in
columns, sorted vertically and special characters are represented by
backslash escape sequences.
Syntax:
dir [OPTIONS] [FILE]
Examples:
1. To list files in the current directory:
dir
2. To list even the hidden files in the current directory:
dir -a
3. To list the content with detailed information for each entry
dir -l
@
B
l
a
c
k
Additional Flags and their Functionalities: h
a
t
A
Short
Long Flag Description k
Flag
It displays all the hidden
-a --all files(starting with .) along with
two files denoted by . and ..
It is similar to -a option except
that it does not display files that
-A --almost-all
signals the current directory and
previous directory.
Display detailed information for
-l -
each entry
Print the allocated size of each
-s --size
file, in blocks File
Used with with -l and -s, to print
-h --human-readable sizes like in human readable
format like 1K, 2M and so on
Classifies entries into their type
-F - based on appended symbol (/,
*, @, %, =)
-v --verbose Print source and destination files
- --group-directories-first To group directories before files
To List subdirectories
-R --recursive
recursively.
sort by file size, display largest
-S -
first
@
B
l
a
c
The Command k
h
reboot
a
t
A
k



## du

The du command, which is short for disk usage lets you retrieve
information about disk space usage information in a specified directory.
In order to customize the output according to the information you need,
this command can be paired with the appropriate options or flags.
Examples:
1. To show the estimated size of sub-directories in the current
directory:
du
2. To show the estimated size of sub-directories inside a specified
directory:
du {PATH_TO_DIRECTORY}
Syntax:
du [OPTION] [FILE]
du [OPTION] --files0-from=F
Additional Flags and their Functionalities:
Note: This does not include an exhaustive list of options.
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
Includes information for both files and t
A
-a --all
directories
k
Provides a grand total at the end of the
-c --total
list of files/directories
Provides information up to N levels from
-d --max-depth=N the directory where the command was
executed
Displays file size in human-readable units,
-h --human-readable
not in bytes
Display only the total filesize instead of a
-s --summarize
list of files/directories
@
B
l
a
c
The command k
h
ping
a
t
A
k
The ping (Packet Internet Groper) command is a network utility used to
check network connectivity between a host and a server or another
host. It sends ICMP (Internet Control Message Protocol) echo requests to
a specified IP address or URL and measures the time it takes to receive
a response. This time delay is referred to as "latency." Ping is a
fundamental tool for network troubleshooting and monitoring.
@
B
l
a
c
Understanding Latency k
h
a
t
A
k
Latency, in the context of networking, is the time delay between
sending a packet and receiving a response.
When you use the ping command, it measures the latency by sending a
series of packets to the target host and calculating the time it takes for
each packet to complete the round trip. The latency is typically
measured in milliseconds (ms). Understanding latency is essential
because:
Network Performance: Lower latency means faster data
transmission and more responsive network connections, which is
critical for real-time applications.
Troubleshooting: High latency can indicate network congestion,
packet loss, or connectivity issues that need attention.
Quality of Service (QoS): Service providers and network
administrators use latency metrics to ensure that network services
meet quality standards.
The basic ping syntax includes ping followed by a hostname, a name of
a website, or the exact IP address.
ping [option] [hostname] or [IP address]
Examples:
1. To get ping version installed on your system.
@
B
l
a
c
k
sudo ping -v
h
a
t
A
2. To check whether a remote host is up, in this case, google.com, k
type in your terminal:
ping google.com
3. Controlling the number of packets to send: Earlier we did not
define the number of packets to send to the server/host by using -c
option we can do so.
ping -c 5 google.com
4. Controlling the size of the packet: Earlier a default sized packets
were sent to a host but we can send light and heavy packet by
using -s option.
ping -s 40 -c 5 google.com
5. Changing the time interval between ping packets: By default ping
wait for 1 sec to send next packet we can change this time by
using -i option.
ping -i 2 google.com
@
B
l
a
c
The command k
h
rsync
a
t
A
k



## echo

The echo command lets you display the line of text/string that is passed
as an argument
Examples:
1. To Show the line of text or string passed as an argument:
echo Hello There
2. To show all files/folders similar to the ls command:
echo *
3. To save text to a file named foo.bar:
echo "Hello There" > foo.bar
4. To append text to a file named foo.bar:
echo "Hello There" >> foo.bar
Syntax:
@
B
l
a
c
k
echo [option] [string]
h
a
t
A
It is usually used in shell scripts and batch files to output status k
text to the screen or a file.The -e used with it enables the
interpretation of backslash escapes
Additional Options and their Functionalities:
Option Description
\b removes all the spaces in between the text
suppress trailing new line with backspace interpretor ‘-e‘ to
\c
continue without emitting new line.
\n creates new line from where it is used
\t creates horizontal tab spaces
carriage returns with backspace interpretor ‘-e‘ to have
\r
specified carriage return in output
\v creates vertical tab spaces
alert returns with a backspace interpretor ‘-e‘ to have sound
\a
alert
-n omits echoing trailing newline .
@
B
l
a
c
The command k
h
finger
a
t
A
k
The finger displays information about the system users.
Examples:
1. View detail about a particular user.
finger abc
Output
Login: abc Name: (null)
Directory: /home/abc Shell: /bin/bash
On since Mon Nov 1 18:45 (IST) on :0 (messages off)
On since Mon Nov 1 18:46 (IST) on pts/0 from :0.0
New mail received Fri May 7 10:33 2013 (IST)
Unread since Sat Jun 7 12:59 2003 (IST)
No Plan.
2. View login details and Idle status about an user
finger -s root
Output
@
B
l
a
c
k
Login Name Tty Idle Login Time
h
Office Office Phone a
t
root root *1 19d Wed 17:45 A
root root *2 3d Fri 16:53 k
root root *3 Mon 20:20
root root *ta 2 Tue 15:43
root root *tb 2 Tue 15:44
Syntax:
finger [-l] [-m] [-p] [-s] [username]
Additional Flags and their Functionalities:
Flag Description
-l Force long output format.
-m Match arguments only on user name (not first or last name).
-p Suppress printing of the .plan file in a long format printout.
-s Force short output format.
Additional Information
Default Format
The default format includes the following items:
Login name
Full username
Terminal name
Write status (an * (asterisk) before the terminal name indicates that
write permission is denied)
For each user on the host, the default information list also includes, if
known, the following items:
@
B
l
a
c
Idle time (Idle time is minutes if it is a single integer, hours and minutkes
h
if a : (colon) is present, or days and hours if a “d” is present.)
a
t
Login time A
k
Site-specific information
Longer Format
A longer format is used by the finger command whenever a list of user’s
names is given. (Account names as well as first and last names of users
are accepted.) This format is multiline, and includes all the information
described above along with the following:
User’s $HOME directory
User’s login shell
Contents of the .plan file in the user’s $HOME directory
Contents of the .project file in the user’s $HOME directory
@
B
l
a
c
The command k
h
groups
a
t
A
k
In Linux, there can be multiple users (those who use/operate the
system), and groups (a collection of users). Groups make it easy to
manage users with the same security and access privileges. A user can
be part of different groups.
Important Points:



## env

The env command in Linux/Unix is used to either print a list of the
current environment variables or to run a program in a custom
environment without changing the current one.
@
B
l
a
c
Syntax k
h
a
t
A
k
env [OPTION] [-] [NAME=VALUE] [COMMAND [ARG]]
@
B
l
a
c
Usage k
h
a
t
A
k
1. Print out the set of current environment variables
env
2. Run a command with an empty environment
env -i command_name
3. Remove variable from the environment
env -u variable_name
4. End each output with NULL
env -0
@
B
l
a
c
Full List of Options k
h
a
t
A
k
Short
Long Flag Description
Flag
-i --ignore-environment Start with an empty environment
End each output line with NUL, not
-0 --null
newline
Remove variable from the
-u --unset=NAME
environment
-C --chdir=DIR Change working directory to DIR
Process and split S into separate
-S --split-string=S arguments. It's used to pass multiple
arguments on shebang lines
Print verbose information for each
-v --debug
processing step
- --help Print a help message
- --version Print the version information
@
B
l
a
c
The command k
h
printenv
a
t
A
k
The printenv prints the values of the specified environment
VARIABLE(s). If no VARIABLE is specified, print name and value pairs for
them all.
Examples:
1. Display the values of all environment variables.
printenv
2. Display the location of the current user's home directory.
printenv HOME
3. To use the --null command line option as the terminating
character between output entries.
printenv --null SHELL HOME
NOTE: By default, the printenv command uses newline as the
terminating character between output entries.
Syntax:
@
B
l
a
c
k
printenv [OPTION] PATTERN
h
a
t
A
k
Additional Flags and their Functionalities:
Short Flag Long Flag Description
End each output line with 0 byte rather than
-0 --null
newline.
--help - Display a help message, and exit.
@
B
l
a
c
The command k
h
hostname
a
t
A
k
hostname is used to display the system's DNS name, and to display or
set its hostname or NIS domain name.
Syntax:
hostname [-a|--alias] [-d|--domain] [-f|--fqdn|--long] [-A|--
all-fqdns] [-i|--ip-address] [-I|--all-ip-addresses] [-s|--
short] [-y|--yp|--nis]
Examples:
1. hostname -a, hostname --alias Display the alias name of the
host (if used). This option is deprecated and should not be used
anymore.
2. hostname -s, hostname --short Display the short host name.
This is the host name cut at the first dot.
3. hostname -V, hostname --version Print version information on
standard output and exit successfully.
Help Command
Run below command to view the complete guide to hostname
@
B
l
a
c
command. k
h
a
t
man hostname A
k
@
B
l
a
c
The command k
h
nano
a
t
A
k



## exit

The exit command is used to terminate (close) an active shell session
Syntax:
exit
Shortcut: Instead of typing exit, press ctrl + D, it will do the same
Functionality.
@
B
l
a
c
The command k
h
diff/sdiff
a
t
A
k
This command is used to display the differences in the files by
comparing the files line by line.
Syntax:
diff [options] File1 File2
Example
1. Lets say we have two files with names a.txt and b.txt containing 5
Indian states as follows-:
$ cat a.txt
Gujarat
Uttar Pradesh
Kolkata
Bihar
Jammu and Kashmir
$ cat b.txt
Tamil Nadu
Gujarat
Andhra Pradesh
Bihar
Uttar pradesh
On typing the diff command we will get below output.
@
B
l
a
c
k
$ diff a.txt b.txt
h
0a1 a
t
> Tamil Nadu A
2,3c3 k
< Uttar Pradesh
Andhra Pradesh
5c5
Uttar pradesh
Flags and their Functionalities
Short Flag Description
-c To view differences in context mode, use the -c option.
To view differences in unified mode, use the -u option. It is
-u
similar to context mode
By default this command is case sensitive. To make this
-i
command case in-sensitive use -i option with diff.
This option is used to display the version of diff which is
-version
currently running on your system.
@
B
l
a
c
The command k
h
tar
a
t
A
k



## factor

The factor command prints the prime factors of each specified integer
NUMBER. If none are specified on the command line, it will read them
from the standard input.
@
B
l
a
c
Syntax k
h
a
t
A
k
$ factor [NUMBER]
OR:
$ factor OPTION
@
B
l
a
c
Options k
h
a
t
A
k
Option Description
--help Display this a help message and exit.
--version Output version information and exit.
@
B
l
a
c
Examples k
h
a
t
A
k
1. Print prime factors of a prime number.
$ factor 50
2. Print prime factors of a non-prime number.
$ factor 75
@
B
l
a
c
The command k
h
uname
a
t
A
k



## free

The free command in Linux/Unix is used to show memory (RAM/SWAP)
information.
@
B
l
a
c
Usage k
h
a
t
A
k
@
B
l
a
c
Show memory usage k
h
a
t
A
k
Action: --- Output the memory usage - available and used, as well as
swap
Details: --- Outputted values are not human-readable (are in bytes)
Command:
free
@
B
l
a
c
Show memory usage in human-readable form k
h
a
t
A
k
Action: --- Output the memory usage - available and used, as well as
swap
Details: --- Outputted values ARE human-readable (are in GB / MB)
Command:
free -h
@
B
l
a
c
The command k
h
top/htop
a
t
A
k
top is the default command-line utility that comes pre-installed on
Linux distributions and Unix-like operating systems. It is used for
displaying information about the system and its top CPU-consuming
processes as well as RAM usage.
htop is interactive process-viewer and process-manager for Linux and
Unix-like operating system based on ncurses. If you take top and put it
on steroids, you get htop.
@
B
l
a
c
Comparison between top and htop: k
h
a
t
A
k
Feature top htop
Interactive system- Interactive system-monitor,
Type monitor, process-viewer process-viewer and
and process-manager process-manager
Operating
Linux distributions, macOS Linux distributions, macOS
System
Doesn't come preinstalled
Built-in and is always
on most Linux distros.
Installation there. Also has more
Manual installation is
adoption due to this fact.
needed
Colorful and nicer text-
User Interface Basic text only
graphics interface
Scrolling Yes, supports horizontal
No
Support and vertical scrolling
Mouse Support No Yes
Process Displays processes but Yes, including user and
utilization not in tree format kernel threads
Scrolling Yes, supports horizontal
No
Support and vertical scrolling
Mouse Support No Yes
Process Displays processes but Yes, including user and
utilization not in tree format kernel threads
Network
No No
Utilization
Disk Utilization No No
Has a learning curve for
some advanced options Easier to use and supports
like searching, sending vi like searching with /.
messages to processes, Sending messages to
Comments etc. It is good to have processes (kill, renice) is
some knowledge of top easier and doesn't require
because it is the default typing in the process
process viewer on many number like top.
systems.
@
B
l
a
c
Examples: k
h
a
t
A
k
top
1. To display dynamic real-time information about running processes:
top
2. Sorting processes by internal memory size (default order - process
ID):
top -o mem
3. Sorting processes first by CPU, then by running time:
top -o cpu -O time
4. Display only processes owned by given user:
top -user {user_name}
htop
1. Display dynamic real-time information about running processes. An
enhanced version of top.
htop
2. displaying processes owned by a specific user:
@
B
l
a
c
k
htop --user {user_name}
h
a
t
A
3. Sort processes by a specified sort_item (use htop --sort help k
for available options):
htop --sort {sort_item}
@
B
l
a
c
Syntax: k
h
a
t
A
k
top [OPTIONS]
htop [OPTIONS]
@
B
l
a
c
Additional Flags and their Functionalities: k
h
a
t
A
k
Short Long
Description
Flag Flag
-a - Sort by memory usage.
Batch mode operation. Starts top in 'Batch mode',
which could be useful for sending output from top to
-b - other programs or to a file. In this mode, top will not
accept input and runs until the iterations limit you've
set with the '-n' command-line option or until killed.
top --user {user_name} Only display processes
-h -
owned by user.
-U -user Help.
-u - This is an alias equivalent to: -o cpu -O time.
@
B
l
a
c
The command k
h
sl
a
t
A
k



## groups

The groups command prints the names of the primary and any
supplementary groups for each given username, or the current process
if no names are given. If more than one name is given, the name of
each user is printed before the list of that user’s groups and the
username is separated from the group list by a colon.
Syntax:
groups [username]
Example 1
Provided with a username
groups demon
In this example, username demon is passed with groups command and
the output shows the groups in which the user demon is present,
separated by a colon.
@
B
l
a
c
Example 2 k
h
a
When no username is passed then this will display the group t
A
membership for the current user: k
groups
Here the current user is demon . So when we run the groups command
without arguments we get the groups in which demon is a user.
Example 3
Passing root with groups command:
$demon# groups
Note: Primary and supplementary groups for a process are normally
inherited from its parent and are usually unchanged since login. This
means that if you change the group database after logging in, groups
will not reflect your changes within your existing login session. The only
options are –help and –version.
@
B
l
a
c
The command k
h
man
a
t
A
k



## gunzip

The gunzip command is an antonym command of gzip command. In
other words, it decompresses files deflated by the gzip command.
gunzip takes a list of files on its command line and replaces each file
whose name ends with .gz, -gz, .z, -z, or _z (ignoring case) and which
begins with the correct magic number with an uncompressed file
without the original extension. gunzip also recognizes the special
extensions .tgz and .taz as shorthands for .tar.gz and .tar.Z
respectively.
Examples:
1. Uncompress a file
gunzip filename.gz
2. Recursively uncompress content inside a directory, that match
extension (suffix) compressed formats accepted by gunzip:
gunzip -r directory_name/
3. Uncompress all files in the current/working directory whose suffix
match .tgz:
gunzip -S .tgz *
@
B
l
a
c
4. List compressed and uncompressed sizes, compression ratio andk
h
uncompressed name of input compressed file/s:
a
t
A
k
gunzip -l file_1 file_2
Syntax:
gunzip [ -acfhklLnNrtvV ] [-S suffix] [ name  ]
Video tutorial about using gzip, gunzip and tar
commands:
This video shows how to compress and decompress in a Unix shell. It
uses gunzip as decompression command.
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
write on standard output, keep original files
-c --stdout
unchanged
-h --help give help information
-k --keep keep (don't delete) input files
-l --list list compressed file contents
-q --quiet suppress all warnings
-r --recursive operate recursively on directories
-S --suffix=SUF use suffix SUF on compressed files
synchronous output (safer if system crashes,
--synchronous
but slower)
-t --test test compressed file integrity
-v --verbose verbose mode
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
-V --version display version number t
A
k
@
B
l
a
c
The command k
h
hostnamectl
a
t
A
k



## gzip

The gzip command in Linux/Unix is used to compress/decompress data.
@
B
l
a
c
Usage k
h
a
t
A
k
@
B
l
a
c
Compress a file k
h
a
t
A
k
Action: --- Compressing a file
Details: --- Reduce the size of the file by applying compression
Command:
gzip file_name
@
B
l
a
c
Decompress a file k
h
a
t
A
k
Action: --- Decompressing a file
Details: --- Restore the file's original form in terms of data and size
Command:
gzip -d archive_01.gz
@
B
l
a
c
Compress multiple files: k
h
a
t
A
k
Action: --- Compress multiple files
Details: --- Compress multiple files into multiple archives
Command:
gzip file_name_01 file_name_02 file_name_03
@
B
l
a
c
Decompress multiple files: k
h
a
t
A
k
Action: --- Decompress multiple files
Details: --- Decompress multiple files from multiple archives
Command:
gzip -d archive_01.gz archive_02.gz archive_03.gz
@
B
l
a
c
Compress a directory: k
h
a
t
A
k
Action: --- Compress all the files in a directory
Details: --- Compress multiple files under a directory in one single
archive
Command:
gzip -r directory_name
@
B
l
a
c
Decompress a directory: k
h
a
t
A
k
Action: --- Decompress all the files in a directory
Details: --- Decompress multiple files under a directory from one single
archive
Command:
gzip -dr directory_name
@
B
l
a
c
Verbose (detailed) output while compressing: k
h
a
t
A
k
Action: --- Compress a file in a more verbose manner
Details: --- Output more information about the action of the command
Command:
gzip -v file_name
@
B
l
a
c
The command k
h
whatis
a
t
A
k



## head

The head command prints the first ten lines of a file.
Example:
head filename.txt
Syntax:
head [OPTION] [FILENAME]
Get a specific number of lines:
Use the -n option with a number (should be an integer) of lines to
display.
Example:
head -n 10 foo.txt
This command will display the first ten lines of the file foo.txt.
Syntax:
head -n <number> foo.txt
@
B
l
a
c
k
Additional Flags and their Functionalities h
a
t
A
Short
Long Flag Description k
Flag
Print the first NUM bytes of each file;
with the leading '-',
-c --bytes=[-]NUM
print all but the last NUM bytes of each
file
Print the first NUM lines instead of the
first 10;
-n --lines=[-]NUM with the leading '-',
print all but the last NUM lines of each
file
-q --quiet, --silent Never print headers giving file names
-v --verbose Always print headers giving file names
-z --zero-terminated Line delimiter is NUL, not newline
--help Display this help and exit
--version Output version information and exit
@
B
l
a
c
The command k
h
tail
a
t
A
k



## help

The help command displays information about builtin commands.
Display information about builtin commands.
If a PATTERN is specified, this command gives detailed help on all
commands matching the PATTERN, otherwise the list of available help
topics is printed.
@
B
l
a
c
Syntax k
h
a
t
A
k
$ help [-dms] [PATTERN ]
@
B
l
a
c
Options k
h
a
t
A
k
Option Description
-d Output short description for each topic.
-m Display usage in pseudo-manpage format.
Output only a short usage synopsis for each topic matching
-s
the provided PATTERN.
@
B
l
a
c
Examples of uses: k
h
a
t
A
k
1. We get the complete information about the cd command
$ help cd
2. We get a short description about the pwd command
$ help -d pwd
3. We get the syntax of the cd command
$ help -s cd
@
B
l
a
c
The command k
h
factor
a
t
A
k



## hostnamectl

The hostnamectl command provides a proper API used to control Linux
system hostname and change its related settings. The command also
helps to change the hostname without actually locating and editing the
/etc/hostname file on a given system.
@
B
l
a
c
Syntax k
h
a
t
A
k
$ hostnamectl [OPTIONS] COMMAND 
where COMMAND can be any of the following
status: Used to check the current hostname settings
set-hostname NAME: Used to set system hostname
set-icon-name NAME: Used to set icon name for host
@
B
l
a
c
Example k
h
a
t
A
k
1. Basic usage to view the current hostnames
$ hostnamectl
or
$ hostnamectl status
2. To change the static host name to myhostname. It may or may not
require root access
$ hostnamectl set-hostname myhostname --static
3. To set or change a transient hostname
$ hostnamectl set-hostname myotherhostname --transient
4. To set the pretty hostname. The name that is to be set needs to be
in the double quote(” “).
$ hostname set-hostname "prettyname" --pretty
@
B
l
a
c
The Command k
h
iptables
a
t
A
k



## ionice

The ionice command is used to set or get process I/O scheduling class
and priority.
If no arguments are given , ionice will query the current I/O scheduling
class and priority for that process.
@
B
l
a
c
Usage k
h
a
t
A
k
ionice [options] -p <pid>
ionice [options] -P <pgid>
ionice [options] -u <uid>
ionice [options] <command>
@
B
l
a
c
A process can be of three scheduling classes: k
h
a
t
A
k
Idle
A program with idle I/O priority will only get disk time when no
other program has asked for disk I/O for a defined grace
period.
The impact of idle processes on normal system actively should be
zero.
This scheduling class doesn’t take priority argument.
Presently this scheduling class is permitted for an ordinary user
(since kernel 2.6.25).
Best Effort
This is effective scheduling class for any process that has not
asked for a specific I/O priority.
This class takes priority argument from 0-7, with lower
number being higher priority.
Programs running at the same best effort priority are served in
round- robbin fashion.
Note that before kernel 2.6.26 a process that has not asked for an
I/O priority formally uses “None” as scheduling class , but the io
schedular will treat such processes as if it were in the best effort
class.
The priority within best effort class will be dynamically derived
@
B
l
a
c
form the CPU nice level of the process : io_priority = ( cpu_nice +k
h
20 ) / 5/ for kernels after 2.6.26 with CFQ I/O schedular a process
a
t
that has not asked for sn io priority inherits CPU scheduling class. A
k
The I/O priority is derived from the CPU nice level of
the process ( smr sd before kernel 2.6.26 ).
Real Time
The real time schedular class is given first access to disk,
regardless of what else is going on in the system.
Thus the real time class needs to be used with some care, as it
cans tarve other processes .
As with the best effort class, 8 priority levels are defined
denoting how big a time slice a given process will
receive on each scheduling window.
This scheduling class is not permitted for an ordinary
user(non-root).
@
B
l
a
c
Options k
h
a
t
A
k
Options Description
name or number of scheduling class, 0: none, 1:
-c, --class
realtime, 2: best-effort, 3: idle
priority (0..7) in the specified scheduling class,only for
-n, --classdata
the realtime and best-effort classes
-p, --pid  act on these already running processes
-P, --pgid  act on already running processes in these groups
-t, --ignore ignore failures
-u, --uid  act on already running processes owned by these users
-h, --help display this help
-V, --version display version
For more details see ionice(1).
@
B
l
a
c
Examples k
h
a
t
A
k
Command O/P Explanation
Running alone ionice will give the
$ ionice none: prio 4
class and priority of current process
$ ionice -p Give the details(class : priority) of the
none : prio 4
101 process specified by given process id
Check the class and priority of
$ ionice -p 2 none: prio 4 process with pid 2 it is none and 4
resp.
2 ( best-effort )
$ ionice -c2 Now lets set process(pid) 2 as a best-
priority 0
-n0 -p2 effort program with highest priority
process 2
best-effort : Now if I check details of Process 2
$ ionice -p 2
prio 0 you can see the updated one
$ ionice /bin/ls get priority and class info of bin/ls
$ ionice -n4 -
set priority 4 of process with pid 2
p2
Now observe the difference between
best-effort: prio
$ ionice -p 2 the command ran above and this one
we have changed priority from 0 to 4
ionice: ignoring (Note that before kernel 2.6.26 a
$ ionice -c0 - given class process that has not asked for an I/O
n4 -p2 data for none priority formally uses “None” as
class scheduling class ,
but the io schedular will treat such
processes as if it were in the best
effort class. )
-t option : ignore failure
For ignoring the warning shown
$ ionice -c0 -
above we can use -t option so it will
n4 -p2 -t
ignore failure
@
B
l
a
c
Conclusion k
h
a
t
A
k
Thus we have successfully learnt about ionice command.
@
B
l
a
c
The command k
h
du
a
t
A
k



## iostat

The iostat command in Linux is used for monitoring system
input/output statistics for devices and partitions. It monitors system
input/output by observing the time the devices are active in relation to
their average transfer rates. The iostat produce reports may be used to
change the system configuration to raised balance the input/output
between the physical disks. iostat is being included in sysstat package.
If you don’t have it, you need to install first.
Syntax:
iostat [ -c ] [ -d ] [ -h ] [ -N ] [ -k | -m ] [ -t ] [ -V ] [
-x ]
[ -z ] [ [ [ -T ] -g group_name ] { device [] | ALL
} ]
[ -p [ device [,] | ALL ] ] [ interval [ count ] ]
Examples:
1. Display a single history-since-boot report for all CPU and Devices:
iostat -d 2
2. Display a continuous device report at two-second intervals:
iostat -d 2 6
@
B
l
a
c
3.Display, for all devices, six reports at two-second intervals: k
h
a
t
iostat -x sda sdb 2 6 A
k
4.Display, for devices sda and sdb, six extended reports at two-second
intervals:
iostat -p sda 2 6
Additional Flags and their Functionalities:
Short Flag Description
-x Show more details statistics information.
-c Show only the cpu statistic.
-d Display only the device report
`-xd Show extended I/O statistic for device only.
-k Capture the statistics in kilobytes or megabytes.
-k23 Display cpu and device statistics with delay.
-j ID mmcbkl0 sda6
Display persistent device name statistics.
-x -m 2 2
-p Display statistics for block devices.
-N Display lvm2 statistic information.
@
B
l
a
c
The command k
h
sudo
a
t
A
k
The sudo ("substitute user do" or "super user do") command allows a
user with proper permissions to execute a command as another user,
such as the superuser.
This is the equivalent of "run as administrator" option in Windows. The
sudo command allows you to elevate your current user account to have
root privileges. Also, the root privilege in sudo is only valid for a
temporary amount of time. Once that time expires, you have to enter
your password again to regain root privilege.
WARNING: Be very careful when using the sudo command. You can
cause irreversible and catastrophic changes while acting as root!
Syntax:
sudo [-OPTION] command
Additional Flags and their Functionalities:
Flag Description
The -V (version) option causes sudo to print the version number
and exit. If the invoking user is already root, the -V option prints
-V
out a list of the defaults sudo was compiled with and the
machine's local network addresses
The -l (list) option prints out the commands allowed (and
-l
forbidden) the user on the current host.
@
B
l
a
c
Flag Description k
h
The -L (list defaults) option lists out the parameters set in a
a
-L Defaults line with a short description for each. This option is t
A
useful in conjunction with grep.
k
The -h (help) option causes sudo to print a usage message and
-h
exit.
If given the -v (validate) option, sudo updates the user's
timestamp, prompting for the user's password if necessary. This
-v
extends the sudo timeout for another 5 minutes (or whatever the
timeout is set to in sudoers) but does not run a command.
The -K (sure kill) option to sudo removes the user's timestamp
-K
entirely. Likewise, this option does not require a password.
The -u (user) option causes sudo to run the specified command
-u as a user other than root. To specify a uid instead of a username,
use #uid.
The -s (shell) option runs the shell specified by the SHELL
-s environment variable if it's set or the shell as specified in the file
passwd.
The -- flag indicates that sudo should stop processing command
--
line arguments. It is most useful in conjunction with the -s flag.
@
B
l
a
c
Examples k
h
a
t
A
k
This command switches your command prompt to the BASH shell as a
root user:
sudo bash
Your command line should change to:
root@hostname:/home/[username]
Adding a string of text to a file is often used to add the name of a
software repository to the sources file, without opening the file for
editing. Use the following syntax with echo, sudo and tee command:
echo ‘string-of-text’ | sudo tee -a [path_to_file]
Example:
echo "deb http://nginx.org/packages/debian `lsb_release -cs`
nginx" \ | sudo tee /etc/apt/sources.list.d/nginx.list
@
B
l
a
c
The command k
h
apt
a
t
A
k
apt (Advantage package system) command is used for interacting with
dpkg (packaging system used by debian). There is already the dpkg
command to manage .deb packages. But apt is a more user-friendly
and efficient way.
In simple terms apt is a command used for installing, deleting and
performing other operations on debian based Linux.
You will be using the apt command mostly with sudo privileges.
Installing packages:
install followed by package_name is used with apt to install a new
package.
Syntax:
sudo apt install package_name
Example:
sudo apt install g++
This command will install g++ on your system.
@
B
l
a
c
Removing packages: k
h
a
remove followed by package_name is used with apt to remove a specific t
A
package. k
Syntax:
sudo apt remove package_name
Example:
sudo apt remove g++
This command will remove g++ from your system.
Searching for a package:
search followed by the package_name used with apt to search a
package across all repositories.
Syntax:
apt search package_name
note: sudo not required
Example:
apt search g++
@
B
l
a
c
k
Removing unused packages: h
a
t
A
Whenever a new package that depends on other packages is installed
k
on the system, the package dependencies will be installed too. When
the package is removed, the dependencies will stay on the system. This
leftover packages are no longer used by anything else and can be
removed.
Syntax:
sudo apt autoremove
This command will remove all unused from your system.
Updating package index:
apt package index is nothing but a database that stores records of
available packages that are enabled on your system.
Syntax:
sudo apt update
This command will update the package index on your system.
Upgrading packages:
If you want to install the latest updates for your installed packages you
may want to run this command.
@
B
l
a
c
Syntax:
k
h
a
t
sudo apt upgrade A
k
The command doesn't upgrade any packages that require removal of
installed packages.
If you want to upgrade a single package, pass the package name:
Syntax:
sudo apt upgrade package_name
This command will upgrade your packages to the latest version.
@
B
l
a
c
The command k
h
yum
a
t
A
k
The yumcommand is the primary package management tool for
installing, updating, removing, and managing software packages in Red
Hat Enterprise Linux. It is an acronym for Yellow Dog Updater,
Modified.
yum performs dependency resolution when installing, updating, and
removing software packages. It can manage packages from installed
repositories in the system or from .rpm packages.
Syntax:
yum -option command
Examples:
1. To see an overview of what happened in past transactions:
yum history
2. To undo a previous transaction:
yum history undo <id>
3. To install firefox package with 'yes' as a response to all
confirmations
@
B
l
a
c
k
yum -y install firefox
h
a
t
A
4. To update the mysql package it to the latest stable version k
yum update mysql
Commonly used commands along with yum:
Command Description
install Installs the specified packages
remove Removes the specified packages
search Searches package metadata for keywords
info Lists the description
update Updates each package to the latest version
repolist Lists repositories
history Displays what has happened in past transactions
groupinstall To install a particular package group
clean To clean all cached files from enabled repository
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
Runs entirely from system cache, doesn’t
-C --cacheonly update the cache and use it even in case it is
expired.
Includes packages that provide a fix for a
- --security security issue. Applicable for the upgrade
command.
-y --assumeyes Automatically answer yes for all questions.
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
Resolves depsolve problems by removing t
A
packages that are causing problems from the
k
- --skip-broken
transaction. It is an alias for the strict
configuration option with value False.
-v --verbose Verbose operation, show debug messages.
@
B
l
a
c
The command k
h
zip
a
t
A
k



## ip

The ip command is present in the net-tools which is used for
performing several network administration tasks. IP stands for Internet
Protocol. This command is used to show or manipulate routing, devices,
and tunnels. It can perform tasks like configuring and modifying the
default and static routing, setting up tunnel over IP, listing IP addresses
and property information, modifying the status of the interface,
assigning, deleting and setting up IP addresses and routes.
Examples:
1. To assign an IP Address to a specific interface (eth1) :
ip addr add 192.168.50.5 dev eth1
2. To show detailed information about network interfaces like IP
Address, MAC Address information etc. :
ip addr show
Syntax:
ip [ OPTIONS ] OBJECT { COMMAND | help }
@
B
l
a
c
k
Additional Flags and their Functionalities: h
a
t
A
Flag Description
k
-a Display and modify IP Addresses
-l Display and modify network interfaces
-r Display and alter the routing table
-n Display and manipulate neighbor objects (ARP table)
-ru Rule in routing policy database.
Output more information. If the option appears twice or more, the
-s
amount of information increases
-f Specifies the protocol family to use
Use the system's name resolver to print DNS names instead of
-r
host addresses
-c To configure color output
@
B
l
a
c
The command k
h
clear
a
t
A
k
In linux, the clear command is used to clear terminal screen.
@
B
l
a
c
Example k
h
a
t
A
k
$ clear
@
B
l
a
c
Before: k
h
a
t
A
k
$ echo Hello World
Hello World
$ clear
@
B
l
a
c
After executing clear command: k
h
a
t
A
k
$
Screenshot:
After running the command your terminal screen will be clear:
@
B
l
a
c
The command k
h
su
a
t
A
k
In linux, su allows you to run commands with a substitute user and
group ID.
When called without arguments, su defaults to running an interactive
shell as root.
@
B
l
a
c
Example : k
h
a
t
A
k
$ su
In case that you wanted to switch to a user called devdojo, you could
do that by running the following command:
$ su devdojo
@
B
l
a
c
The syntax of the su command is : k
h
a
t
A
k
$ su [options] [-] [<user>[<argument>]]
@
B
l
a
c
Options : k
h
a
t
A
k
-m, -p --> do not reset environment variables
-w --> do not reset specified variables
-g --> specify the primary group
-G --> specify a supplemental group
-l --> make the shell a login shell
-f --> pass -f to the shell (for csh or tcsh)
-s --> run <shell> if /etc/shell allows it
-p --> create a new pseudo terminal
-h --> display this help
-v --> display version
@
B
l
a
c
The command k
h
wget
a
t
A
k



## iptables

The iptables command is used to set up and maintain tables for the
Netfilter firewall for IPv4, included in the Linux kernel. The firewall
matches packets with rules defined in these tables and then takes the
specified action on a possible match.
Syntax:
iptables --table TABLE -A/-C/-D CHAIN rule --jump Target
Example and Explanation:
This command will append to the chain provided in parameters:
iptables [-t table] --append [chain] [parameters]
This command drops all the traffic coming on any port:
iptables -t filter --append INPUT -j DROP
Flags and their Functionalities:
Flag Description
Check if a rule is present in the chain or not. It returns 0 if the
-C
rule exists and returns 1 if it does not.
-A Append to the chain provided in parameters.
@
B
l
a
c
The command k
h
netstat
a
t
A
k
The term netstat stands for Network Statistics. In layman’s terms,
netstat command displays the current network connections, networking
protocol statistics, and a variety of other interfaces.
Check if you have netstat on your PC:
netstat –v
If you don't have netstat installed on your PC, you can install it with
the following command:
sudo apt install net-tools
You can use netstat command for some use cases given
below:
Netstat command with -nr flag shows the routing table detail on
the terminal.
Example:
netstat -nr
Netstat command with -i flag shows statistics for the currently
configured network interfaces. This command will display the first
10 lines of file foo.txt .
@
B
l
a
c
Example: k
h
a
t
netstat -i A
k
Netstat command with -tunlp will gives a list of networks, their
current states, and their associated ports.
Example:
netstat -tunlp
You can get the list of all TCP port connection by using -at with
netstat.
netstat -at
You can get the list of all UDP port connection by using -au with
netstat.
netstat -au
You can get the list of all active connection by using -l with
netstat.
netstat -l
@
B
l
a
c
The command k
h
lsof
a
t
A
k



## kill

The kill command
sends a signal to a process which terminates the process. If the user
doesn’t specify any signal which is to be sent along with kill command
then default TERM signal is sent that terminates the process.
Signals can be specified in three ways:
By number (e.g. -5)
With SIG prefix (e.g. -SIGkill)
Without SIG prefix (e.g. -kill)
Syntax
kill [OPTIONS] [PID]
Examples:
1. To display all the available signals you can use below command
option:
kill -l
2. To show how to use a PID with the kill command.
@
B
l
a
c
k
$kill pid
h
a
t
A
3. To show how to send signal to processes. k
kill {-signal | -s signal} pid
4. Specify Signal:
using numbers as signals
kill -9 pid
using SIG prefix in signals
kill -SIGHUP pid
without SIG prefix in signals
kill -HUP pid
Arguments:
The list of processes to be signaled can be a mixture of names and
PIDs.
@
B
l
a
c
k
pid Each pid can be expressed in one of the following
h
ways: a
t
A
n where n is larger than 0. The process with k
PID n is signaled.
0 All processes in the current process group
are signaled.
-1 All processes with a PID larger than 1 are
signaled.
-n where n is larger than 1. All processes in
process group n are signaled.
When an argument of the form '-n' is
given, and it is meant to denote a
process group, either a signal must be
specified first, or the argument must
be preceded by a '--' option, otherwise it
will be taken as the signal to
send.
name All processes invoked using this name will be
signaled.
Options:
@
B
l
a
c
k
-s, --signal signal
h
The signal to send. It may be given as a name or a a
t
number. A
k
-l, --list [number]
Print a list of signal names, or convert the given
signal number to a name. The
signals can be found in /usr/include/linux/signal.h.
-L, --table
Similar to -l, but it will print signal names and
their corresponding numbers.
-a, --all
Do not restrict the command-name-to-PID conversion
to processes with the same UID
as the present process.
-p, --pid
Only print the process ID (PID) of the named
processes, do not send any signals.
--verbose
Print PID(s) that will be signaled with kill along
with the signal.
@
B
l
a
c
The command k
h
killall
a
t
A
k
killall sends a signal to all processes running any of the specified
commands. If no signal name is specified, SIGTERM is sent. In general,
killall command kills all processes by knowing the name of the
process.
Signals can be specified either by name (e.g. -HUP or -SIGHUP) or by
number (e.g. -1) or by option -s.
If the command name is not a regular expression (option -r) and
contains a slash (/), processes executing that particular file will be
selected for killing, independent of their name.
killall returns a zero return code if at least one process has been
killed for each listed command, or no commands were listed and at
least one process matched the -u and -Z search criteria. killall
returns non-zero otherwise.
A killall process never kills itself (but may kill other killall
processes).
Examples:
1. Kill all processes matching the name conky with SIGTERM:
killall conky
# OR
killall -SIGTERM conky
# OR
kilall -15 conky
I was able to kill Wine ( which are Windows exe files running on Linux )
@
B
l
a
c
applications this way too. k
h
a
t
killall TQ.exe A
k
2. List all the supported signals:
$ killall -l
HUP INT QUIT ILL TRAP ABRT BUS FPE KILL USR1 SEGV USR2 PIPE
ALRM TERM STKFLT
CHLD CONT STOP TSTP TTIN TTOU URG XCPU XFSZ VTALRM PROF WINCH
POLL PWR SYS
As for the numbers.
@
B
l
a
c
k
$ for s in $(killall -l); do echo -n "$s " && kill -l $s; done
h
HUP 1 a
t
INT 2 A
QUIT 3 k
ILL 4
TRAP 5
ABRT 6
BUS 7
FPE 8
KILL 9
USR1 10
SEGV 11
USR2 12
PIPE 13
ALRM 14
TERM 15
STKFLT 16
CHLD 17
CONT 18
STOP 19
TSTP 20
TTIN 21
TTOU 22
URG 23
XCPU 24
XFSZ 25
VTALRM 26
PROF 27
WINCH 28
POLL 29
PWR 30
SYS 31
3. Ask before killing, to prevent unwanted kills:
$ killall -i conky
Kill conky(1685) ? (y/N)
4. Kill all processes and wait until the processes die.
@
B
l
a
c
k
killall -w conky
h
a
t
A
5. Kill based on time: k
# Kill all firefox younger than 2 minutes
killall -y 2m firefox
# Kill all firefox older than 2 hours
killall -o 2h firefox
Syntax:
killall [OPTION] [--] NAME
killall -l, --list
killall -V, --version
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
require an exact match for very long
-e --exact
names
-I --ignore-case case insensitive process name match
-g --process-group kill process group instead of process
-y --younger-than kill processes younger than TIME
-o --older-than kill processes older than TIME
-i --interactive ask for confirmation before killing
-l --list list all known signal names
-q --quiet don't print complaints
interpret NAME as an extended regular
-r --regexp
expression
-s --signal SIGNAL send this signal instead of SIGTERM
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
-u --user USER kill only process(es) running as USER t
A
-v --verbose report if the signal was successfully sent k
-w --wait wait for processes to die
match processes that belong to the same
-n --ns PID
namespaces as PID
REGEXP kill only process(es) having
-Z --context
context (must precede other arguments)
Related commands
kill, pidof
@
B
l
a
c
The command k
h
env
a
t
A
k



## locate

The locate command searches the file system for files and directories
whose name matches a given pattern through a database file that is
generated by the updatedb command.
Examples:
1. Running the locate command to search for a file named .bashrc.
locate .bashrc
Output
/etc/bash.bashrc
/etc/skel/.bashrc
/home/linuxize/.bashrc
/usr/share/base-files/dot.bashrc
/usr/share/doc/adduser/examples/adduser.local.conf.examples/ba
sh.bashrc
/usr/share/doc/adduser/examples/adduser.local.conf.examples/sk
el/dot.bashrc
The /root/.bashrc file will not be shown because we ran the command
as a normal user that doesn’t have access permissions to the /root
directory.
If the result list is long, for better readability, you can pipe the output to
the less command:
@
B
l
a
c
k
locate .bashrc | less
h
a
t
A
2. To search for all .md files on the system k
locate *.md
3. To search all .py files and display only 10 results
locate -n 10 *.py
4. To performs case-insensitive search.
locate -i readme.md
Output
/home/linuxize/p1/readme.md
/home/linuxize/p2/README.md
/home/linuxize/p3/ReadMe.md
5. To return the number of all files containing .bashrc in their name.
locate -c .bashrc
Output
6. The following would return only the existing .json files on the file
@
B
l
a
c
system. k
h
a
t
locate -e *.json A
k
7. To run a more complex search the -r (--regexp) option is used. To
search for all .mp4 and .avi files on your system and ignore case.
locate --regex -i "(\.mp4|\.avi)"
Syntax:
1. locate [OPTION] PATTERN
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
It is used to display only entries that
-A --all match all PATTERNs instead of requiring
only one of them to match.
It is used to match only the base name
-b --basename
against the specified patterns.
It is used for writing the number
-c --count matching entries instead of writing file
names on standard output.
It is used to replace the default
-d --database DBPATH
database with DBPATH.
It is used to display only entries that
-e --existing refer to existing files during the
command is executed.
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
If the --existing option is specified, It t
A
is used for checking whether files exist
k
and follow trailing symbolic links. It will
-L --follow omit the broken symbolic links to the
output. This is the default behavior. The
opposite behavior can be specified
using the --nofollow option.
It is used to display the help
-h --help documentation that contains a
summary of the available options.
It is used to ignore case sensitivity of
-i --ignore-case
the specified patterns.
It is used to ignore punctuation and
-p --ignore-spaces
spaces when matching patterns.
It is used to ignore accents using iconv
-t --transliterate
transliteration when matching patterns.
If this option is specified, the command
-l --limit, -n LIMIT exit successfully after finding LIMIT
entries.
It is used to ignore the compatibility
-m --mmap
with BSD, and GNU locate.
It is used to separate the entries on
output using the ASCII NUL character
-0 --null
instead of writing each entry on a
separate line.
It is used to write statistics about each
-S --statistics read database to standard output
instead of searching for files.
It is used for searching a basic regexp
-r --regexp REGEXP
REGEXP.
It is used to describe all PATTERNs as
--regex -
extended regular expressions.
It is used to display the version and
-V --version
license information.
It is used for matching only the whole
-w --wholename
path name in specified patterns.
@
B
l
a
c
The command k
h
iostat
a
t
A
k



## login

The login command initiates a user session.
@
B
l
a
c
Syntax k
h
a
t
A
k
$ login [-p] [-h host] [-H] [-f username|username]
@
B
l
a
c
Flags and their functionalities k
h
a
t
A
k
Short
Description
Flag
Used to skip a login authentication. This option is usually
-f
used by the getty(8) autologin feature.
Used by other servers (such as telnetd(8) to pass the name
-h of the remote host to login so that it can be placed in utmp
and wtmp. Only the superuser is allowed use this option.
-p Used by getty(8) to tell login to preserve the environment.
Used by other servers (for example, telnetd(8)) to tell login
-H that printing the hostname should be suppressed in the
login: prompt.
--help Display help text and exit.
-v Display version information and exit.
@
B
l
a
c
Examples k
h
a
t
A
k
To log in to the system as user abhishek, enter the following at the login
prompt:
$ login: abhishek
If a password is defined, the password prompt appears. Enter your
password at this prompt.
@
B
l
a
c
command k
h
lscpu
a
t
A
k
lscpu in Linux/Unix is used to display CPU Architecture info. lscpu
gathers CPU architecture information from sysfs and /proc/cpuinfo
files.
For example :
manish@godsmack:~$ lscpu
Architecture: x86_64
CPU op-mode(s): 32-bit, 64-bit
Byte Order: Little Endian
CPU(s): 4
On-line CPU(s) list: 0-3
Thread(s) per core: 2
Core(s) per socket: 2
Socket(s): 1
NUMA node(s): 1
Vendor ID: GenuineIntel
CPU family: 6
Model: 142
Model name: Intel(R) Core(TM) i5-7200U CPU @
2.50GHz
Stepping: 9
CPU MHz: 700.024
CPU max MHz: 3100.0000
CPU min MHz: 400.0000
BogoMIPS: 5399.81
Virtualization: VT-x
L1d cache: 32K
L1i cache: 32K
L2 cache: 256K
L3 cache: 3072K
NUMA node0 CPU(s): 0-3
@
B
l
a
c
Options k
h
a
t
A
k
-a, --all Include lines for online and offline CPUs in the output
(default for -e). This option may only specified together with option -e or
-p. For example: lsof -a
-b, --online Limit the output to online CPUs (default for -p). This
option may only be specified together with option -e or -p. For example:
lscpu -b
-c, --offline Limit the output to offline CPUs. This option may only be
specified together with option -e or -p.
-e, --extended [=list] Display the CPU information in human
readable format. For example: lsof -e
For more info: use man lscpu or lscpu --help
@
B
l
a
c
The command k
h
cp
a
t
A
k
The cp is a command-line utility for copying files and directory. cp
stands for copy. This command is used to copy files or group of files or
directory. It creates an exact image of a file on a disk with different file
name.



## ls

The ls command lets you see the files and directories inside a specific
directory (current working directory by default). It normally lists the files
and directories in ascending alphabetical order.
Examples:
1. To show the files inside your current working directory:
ls
2. To show the files and directory inside a specific Directory:
ls {Directory_Path}
Syntax:
ls [-OPTION] [DIRECTORY_PATH]
Interactive training
In this interactive tutorial, you will learn the different ways to use the ls
command:



## ls

The ls command by Tony
@
B
l
a
c
k
Additional Flags and their Functionalities: h
a
t
A
Short
Long Flag Description k
Flag
-l - Show results in long format
-S - Sort results by file size
-t - Sort results by modification time
Show files and directories in reverse order
-r --reverse
(descending alphabetical order)
Show all files, including hidden files (file
-a --all
names which begin with a period .)
Show long format files and directories
-la -
including hidden files
list long format files and directories with
-lh -
readable size
Shows all like -a but without showing
-A --almost-all .(current working directory) and .. (parent
directory)
Instead of listing the files and directories
inside the directory, it shows any
-d --directory information about the directory itself, it
can be used with -l to show long
formatted information
Appends an indicator character to the end
of each listed name, as an example: /
-F --classify
character is appended after each directory
name listed
like -l but displays file size in human-
-h --human-readable
readable unit not in bytes
Setting Persistent Options:
Customizing command behavior in Linux is easy using the alias
command. To make these changes permanent, follow these steps:
1. Create the Alias: Define your alias with the desired options. For
@
B
l
a
c
example, to enhance the ls command: k
h
a
t
alias ls="ls --color=auto -lh" A
k
2. Persistence: This alias is effective only for the current session. To
make it permanent, add the alias to your shell's configuration file:
Bash: Append the alias to ~/.bashrc:
echo 'alias ls="ls --color=auto -lh"' >> ~/.bashrc
source ~/.bashrc
3. Verification: Open a new terminal session, and the ls command
will display files as configured.
@
B
l
a
c
The command k
h
cd
a
t
A
k



## lsof

The lsof command shows file infomation of all the files opened by a
running process. It's name is also derived from the fact that, list open
files > lsof
An open file may be a regular file, a directory, a block special file, a
character special file, an executing text reference, a library , a stream
or a network file (Internet socket, NFS file or UNIX domain socket). A
specific file or all the files in a file system may be selected by path.
Syntax:
lsof [-OPTION] [USER_NAME]
Examples:
1. To show all the files opened by all active processes:
lsof
2. To show the files opened by a particular user:
lsof -u [USER_NAME]
3. To list the processes with opened files under a specified directory:
@
B
l
a
c
k
lsof +d [PATH_TO_DIR]
h
a
t
A
k
Options and their Functionalities:
Option Additional Options Description
List all network connections running,
-i tcp/ udp/ :port Additionally, on udp/tcp or on specified
port.
-i4 - List all processes with ipv4 connections.
-i6 - List all processes with ipv6 connections.
List all the files of a particular process
-c [PROCESS_NAME]
with given name.
List all the files opened by a specified
-p [PROCESS_ID]
process id.
List all the files that are not opened by a
-p ^[PROCESS_ID]
specified process id.
List the processes with opened files
+d [PATH]
under a specified directory
List the files opened by parent process
+R -
Id.
Help Command
Run below command to view the complete guide to lsof command.
man lsof
@
B
l
a
c
The command k
h
bzip2
a
t
A
k



## man

The man command is used to display the manual of any command that
we can run on the terminal. It provides information like: DESCRIPTION,
OPTIONS, AUTHORS and more.
Examples:
1. Man page for printf:
man printf
2. Man page section 2 for intro:
man 2 intro
3. Viewing the Manual for a Local File (using the -l flag):
man -l [LOCAL-FILE]
Syntax:
man [SECTION-NUM] [COMMAND NAME]
@
B
l
a
c
Additional Flags and their Functionalities: k
h
a
Short Long t
Description A
Flag Flag
k
-f - Return the sections of an command
-a - Display all the manual pages of an command
Searches the given command with RegEx in all
-k -
man pages
Returns the location of a given command man
-w -
page
-I - Searches the command manual case sensitive
@
B
l
a
c
The command k
h
passwd
a
t
A
k
In Linux, passwd command changes the password of user accounts. A
normal user may only change the password for their own account, but a
superuser may change the password for any account. passwd also
changes the account or associated password validity period.
@
B
l
a
c
Example k
h
a
t
A
k
$ passwd
@
B
l
a
c
The syntax of the passwd command is : k
h
a
t
A
k
$ passwd [options] [LOGIN]
@
B
l
a
c
options k
h
a
t
A
k
-a, --all
This option can be used only with -S and causes show
status for all users.
-d, --delete
Delete a user's password.
-e, --expire
Immediately expire an account's password.
-h, --help
Display help message and exit.
-i, --inactive
This option is used to disable an account after the
password has been expired for a number of days.
-k, --keep-tokens
Indicate password change should be performed only for
expired authentication tokens (passwords).
-l, --lock
Lock the password of the named account.
-q, --quiet
Quiet mode.
-r, --repository
change password in repository.
-S, --status
Display account status information.
@
B
l
a
c
The command k
h
w
a
t
A
k



## mkdir

The mkdir command in Linux/Unix is used to create a directory.
@
B
l
a
c
Syntax k
h
a
t
A
k
$ mkdir [-m=mode] [-p] [-v] [-Z=context] directory [directory
]
@
B
l
a
c
Examples k
h
a
t
A
k
1. Make a directory named myfiles.
$ mkdir myfiles
2. Create a directory named myfiles at the home directory:
$ mkdir ~/myfiles
3. Create the mydir directory, and set its file mode (-m) so that all
users (a) may read (r), write (w), and execute (x) it.
$ mkdir -m a=rwx mydir
You can also create sub-directories of a directory. It will create the
parent directory first, if it doesn't exist. If it already exists, then it move
further to create the sub-directories without any error message.
For directories, this means that any user on the system may view
("read"), and create/modify/delete ("write") files in the directory. Any
user may also change to ("execute") the directory, for example with the
cd command.
4. Create the directory /home/test/src/python. If any of the parent
directories /home, /home/test, or /home/test/src do not already
exist, they are automatically created.
$ mkdir -p /home/test/src/python
@
B
l
a
c
Options k
h
a
t
A
k
Short
Long Flags Descriptions
Flags
Set file mode (as in chmod), not a=rwx -
-m --mode=MODE
umask.
No error if existing, make parent directories
-p --parents
as needed.
-v --verbose Print a message for each created directory.
Set the SELinux security context of each
-Z --context=CTX
created directory to CTX.
- --help Display a help message and exit.
- --version Output version information and exit.
@
B
l
a
c
The command k
h
gzip
a
t
A
k



## mpstat

The mpstat command is used to report processor related statistics. It
accurately displays the statistics of the CPU usage of the system and
information about CPU utilization and performance.
Syntax:
mpstat [options] [<interval> [<count>]]
Note : It initializes the first processor with CPU 0, the second
one with CPU 1, and so on.
Options and their Functionalities:
Option Description
-A to display all the detailed statistics
-h to display mpstat help
-I to display detailed interrupts statistics
to report summary CPU statistics based on NUMA node
-n
placement
to indicate the NUMA nodes for which statistics are to be
-N
reported
to indicate the processors for which statistics are to be
-P
reported
to display the statistics in JSON (Javascript Object Notation)
-o
format
-T to display topology elements in the CPU report
-u to report CPU utilization
-v to display utilization statistics at the virtual processor level
@
B
l
a
c
Option Description k
h
-V to display mpstat version
a
t
-ALL to display detailed statistics about all CPUs A
k
Examples:
1. To display processor and CPU statistics:
mpstat
2. To display processor number of all CPUs:
mpstat -P ALL
3. To get all the information which the tool may collect:
mpstat -A
4. To display CPU utilization by a specific processor:
mpstat -P 0
5. To display CPU usage with a time interval:
mpstat 1 5
Note: This command will print 5 reports with 1 second time
interval
@
B
l
a
c
The Command k
h
ncdu
a
t
A
k
ncdu (NCurses Disk Usage) is a curses-based version of the well-known
du command. It provides a fast way to see what directories are using
your disk space.
@
B
l
a
c
Example k
h
a
t
A
k
1. Quiet Mode
ncdu -q
2. Omit mounted directories
ncdu -q -x
@
B
l
a
c
Syntax k
h
a
t
A
k
ncdu [-hqvx] [--exclude PATTERN] [-X FILE] dir
@
B
l
a
c
Additional Flags and their Functionalities: k
h
a
t
A
k
Short
Long Flag Description
Flag
-h - Print a small help message
Quiet mode. While calculating disk space,
ncdu will update the screen 10 times a
second by default, this will be decreased
-q -
to once every 2 seconds in quiet mode.
Use this feature to save bandwidth over
remote connections.
-v - Print version.
Only count files and directories on the
-x -
same filesystem as the specified dir.
Exclude files that match PATTERN. This
--exclude
- argument can be added multiple times to
PATTERN
add more patterns.
Exclude files that match any pattern in
-X --exclude-from
FILE. Patterns should be separated by a
FILE FILE
newline.
@
B
l
a
c
The command k
h
uniq
a
t
A
k



## mv

The mv command lets you move one or more files or directories
from one place to another in a file system like UNIX. It can be used for
two distinct functions:
To rename a file or folder.
To move a group of files to a different directory.
Note: No additional space is consumed on a disk during renaming, and
the mv command doesn't provide a prompt for confirmation
Syntax:
mv [options] source (file or directory) destination
Examples:
1. To rename a file called old_name.txt:
mv old_name.txt new_name.txt
2. To move a file called essay.txt from the current directory to a
directory called assignments and rename it essay1.txt:
mv essay.txt assignments/essay1.txt
3. To move a file called essay.txt from the current directory to a
@
B
l
a
c
directory called assignments without renaming it k
h
a
t
mv essay.txt assignments A
k
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
Force move by overwriting destination file
-f --force
without prompt
-i --interactive Interactive prompt before overwrite
Move only when the source file is newer than
-u --update the destination file or when the destination
file is missing
-n --no-clobber Do not overwrite an existing file
-v --verbose Print source and destination files
-b --backup Create a Backup of Existing Destination File
@
B
l
a
c
The command k
h
ps
a
t
A
k



## nano

The nano command lets you create/edit text files.
Installation:
Nano text editor is pre-installed on macOS and most Linux distros. It's
an alternative to vi and vim. To check if it is installed on your system
type:
nano --version
If you don't have nano installed you can do it by using the package
manager:
Ubuntu or Debian:
sudo apt install nano
Examples:
1. Open an existing file, type nano followed by the path to the file:
nano /path/to/filename
2. Create a new file, type nano followed by the filename:
@
B
l
a
c
k
nano filename
h
a
t
A
3. Open a file with the cursor on a specific line and character use the k
following syntax:
nano +line_number,character_number filename
Overview of some Shortcuts and their Functionalities:
Shortcut Description
Ctrl + S Save current file
Ctrl + O Offer to write file ("Save as")
Ctrl + X Close buffer, exit from nano
Ctrl + K Cut current line into cutbuffer
Ctrl + U Paste contents of cutbuffer
Alt + 6 Copy current line into cutbuffer
Alt + U Undo last action
Alt + E Redo last undone action
@
B
l
a
c
The command k
h
rm
a
t
A
k
rm which stands for "remove" is a command used to remove (delete)
specific files. It can also be used to remove directories by using the
appropriate flag.
Example:
rm filename.txt
Syntax
rm [OPTION] [FILE|DIRECTORY]
Flags and their Functionalities:
Short
Long Flag Description
Flag
Ignore nonexistance of files or
-f --force
directories, never prompt
-i - Prompt before every removal
Prompt once before removal of more
-I - than 3 files, or when removing
recursively
-d --dir remove empty directories
-v --verbose explain what is being done
-r or - remove directories and their contents
--recursive
R recursively
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
- --help Display help then exit t
A
First, Print version Information, Then k
- --version
exit
- --no-preserve-root do not treat / specially
do not remove / (default)
with 'all', reject any command line
- -preserve-root[=all]
argument on a separate device from
its parent
prompt according to WHEN, never,
- --interactive[=WHEN] once -I, or always -i, without WHEN,
prompt always
when removing a hierarchy
recursively, skip any directory that is
- --one-file-system on a file system different from that of
the corresponding command line
argument0
IMPORTANT NOTICE:
1. rm doesn't remove directories by default, so use -r, -R, --
recursive options to remove each listed directory, along with all
of its contents.
2. To remove a file whose name starts with - such as -foo, use one
of the following commands:
rm -- -foo
rm ./-foo
3. To ensure that files/directories being deleted are truly
unrecoverable, consider using the shred command.
@
B
l
a
c
The command k
h
ifconfig
a
t
A
k
ifconfig is used to configure the kernel-resident network interfaces. It
is used at boot time to set up interfaces as necessary. After that, it is
usually only needed when debugging or when system tuning is needed.
If no arguments are given, ifconfig displays the status of the currently
active interfaces. If a single interface argument is given, it displays the
status of the given interface only; if a single -a argument is given, it
displays the status of all interfaces, even those that are down.
Otherwise, it configures an interface.
Syntax:
ifconfig [-v] [-a] [-s] [interface]
ifconfig [-v] interface [aftype] options
Examples:
1. To display the currently active interfaces:
ifconfig
2. To show all interfaces which are currently active, even if down:
ifconfig -a
3. To show all the error conditions:
@
B
l
a
c
k
ifconfig -v
h
a
t
A
4. To show a short list: k
ifconfig -s
5. To display details of the specific network interface (say eth0):
ifconfig eth0
6. To activate the driver for a interface (say eth0):
ifconfig eth0 up
7. To deactivate the driver for a interface (say eth0):
ifconfig eth0 down
8. To assign a specific IP address to a network interface (say eth0):
ifconfig eth0 10.10.1.23
9. To change MAC(Media Access Control) address of a network
interface (say eth0):
ifconfig eth0 hw ether AA:BB:CC:DD:EE:FF
10. To define a netmask for a network interface (say eth0):
@
B
l
a
c
k
ifconfig eth0 netmask 255.255.255.224
h
a
t
A
11. To enable promiscous mode on a network interface (say eth0): k
ifconfig eth0 promisc
In normal mode, when a packet is received by a network card, it verifies
that it belongs to itself. If not, it drops the packet normally. However, in
the promiscuous mode, it accepts all the packets that flow through the
network card.
12. To disable promiscous mode on a network interface (say eth0):
ifconfig eth0 -promisc
13. To set the maximum transmission unit to a network interface (say
eth0):
ifconfig eth0 mtu 1000
The MTU allows you to set the limit size of packets that are transmitted
on an interface. The MTU is able to handle a maximum number of
octets to an interface in one single transaction.
14. To add additional IP addresses to a network interface, you can
configure a network alias to the network interface:
ifconfig eth0:0 10.10.1.24
Please note that the alias network address is in the same subnet mask
of the network interface. For example, if your eth0 network ip address is
@
B
l
a
c
10.10.1.23, then the alias ip address can be 10.10.1.24. Example ofk
h
an invalid IP address is 10.10.2.24 since the interface subnet mask is
a
255.255.255.224 t A
k
15. To remove a network alias:
ifconfig eth0:0 down
Remember that for every scope (i.e. same net with address/netmask
combination) all aiases are deleted, if you delete the first alias.
Help Command
Run below command to view the complete guide to ifconfig
command.
man ifconfig
@
B
l
a
c
The command k
h
ip
a
t
A
k



## paste

The paste command writes lines of two or more files, sequentially and
separated by TABs, to the standard output
Syntax:
paste [OPTIONS] [FILE]
Examples:
1. To paste two files
paste file1 file2
2. To paste two files using new line as delimiter
paste -d '\n' file1 file2
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
-d --delimiter use charater of TAB
paste one file at a time instead of in
-s --serial
parallel
-z --zero-terminated set line delimiter to NUL, not newline
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
--help print command help t
A
--version print version information k
@
B
l
a
c
The command k
h
exit
a
t
A
k



## ps

The ps command is used to identify programs and processes that are
running on the system and the resources they are using. Its frequently
pipelined with other commands like grep to search for a
program/process or less so that the user can analyze the output one
page at a time.
Let's say you have a program like openshot which is notorious for
hogging system resources when exporting a video, and you want to
close it, but the GUI has become unresponsive.
Example
1. You want to find the PID of openshot and kill it.
ps aux | grep openshot
kill - <openshot PID>
2. To Show all the running processes:
ps -A
Syntax
ps [options]
When run without any options, it's useless and will print: CMD - the
executable processes/(program) running, their PID - process ID, TTY -
@
B
l
a
c
terminal type and Time - How long the process has utilized the CPU ork
h
thread.
a
t
A
k
Common Option
If you are going to remember only one thing from this page let it be
these three letter aux: a - which displays all processes running,
including those being run by other users. u - which shows the effective
user of a process, i.e. the person whose file access permissions are
used by the process. x - which shows processes that do not have a TTY
associated with them.
Additional Options:
Option Description
a Shows list all processes with a terminal (tty)
-A Lists all processes. Identical to -e
Shows all processes except both session leaders and
-a
processes not associated with a terminal
-d Select all processes except session leaders
Shows all processes except those that fulfill the
--deselect
specified conditions. Identical to -N
-e Lists all processes. Identical to -A
Shows all processes except those that fulfill the
-N
specified conditions. Identical to -deselect
Select all processes associated with this terminal.
T
Identical to the -t option without any argument
r Restrict the selection to only running processes
--help simple Shows all the basic options
--help all Shows every available options
Another useful command which give a realtime snapshot of the
processes and the resources they are using about every ten seconds is
top.
@
B
l
a
c
The command k
h
kill
a
t
A
k
kill command in Linux (located in /bin/kill), is a built-in command
which is used to terminate processes manually.



## reboot

The reboot command is used to restart a linux system. However, it
requires elevated permission using the sudo command. Necessity to
use this command usually arises after significant system or network
updates have been made to the system.
@
B
l
a
c
Syntax k
h
a
t
A
k
reboot [OPTIONS]
Options
–help : This option prints a short help text and exit.
-halt : This command will stop the machine.
-w, –wtmp-only : This option only writes wtmp shutdown entry, it
do not actually halt, power-off, reboot.
Examples
1. Basic Usage. Mainly used to restart without any further details
$ sudo reboot
However, alternatively the shutdown command with the -r option
$ sudo shutdown -r now
Note that the usage of the reboot, halt and power off is almost similar
in syntax and effect. Run each of these commands with –help to see the
details.
2.



## reboot

The reboot command has limited usage, and the shutdown
command is being used instead of reboot command to fulfill much
more advance reboot and shutdown requirements. One of those
situations is a scheduled restart. Syntax is as follows
@
B
l
a
c
k
$ sudo shutdown –r [TIME] [MESSAGE]
h
a
t
A
Here the TIME has various formats. The simplest one is now, already k
been listed in the previous section, and tells the system to restart
immediately. Other valid formats we have are +m, where m is the
number of minutes we need to wait until restart and HH:MM which
specifies the TIME in a 24hr clock.
Example to reboot the system in 2 minutes
$ sudo shutdown –r +2
Example of a scheduled restart at 03:00 A.M
$ sudo shutdown –r 03:00
3. Cancelling a Reboot. Usually happens in case one wants to cancel
a scheduled restart
Syntax
$ sudo shutdown –c [MESSAGE]
Usage
$sudo shutdown -c "Scheduled reboot cancelled because the
chicken crossed the road"
4. Checking your reboot logs
@
B
l
a
c
k
$ last reboot
h
a
t
A
k
@
B
l
a
c
The command k
h
sort
a
t
A
k
the sort command is used to sort a file, arranging the records in a
particular order. By default, the sort command sorts a file assuming the
contents are ASCII. Using options in the sort command can also be used
to sort numerically.
Examples:
Suppose you create a data file with name file.txt:
Command :
$ cat > file.txt
abhishek
chitransh
satish
rajan
naveen
divyam
harsh
Sorting a file: Now use the sort command
Syntax :
sort filename.txt
@
B
l
a
c
k
Command:
h
$ sort file.txt a
t
A
Output : k
abhishek
chitransh
divyam
harsh
naveen
rajan
satish
Note: This command does not actually change the input file, i.e. file.txt.
The sort function on a file with mixed case content
i.e. uppercase and lower case: When we have a mix file with both
uppercase and lowercase letters then first the upper case letters would
be sorted following with the lower case letters.
Example:
Create a file mix.txt
Command :
$ cat > mix.txt
abc
apple
BALL
Abc
bat
Now use the sort command
@
B
l
a
c
k
Command :
h
$ sort mix.txt a
t
Output : A
Abc k
BALL
abc
apple
bat
@
B
l
a
c
The command k
h
paste
a
t
A
k



## rsync

The rsync command is probably one of the most used commands out
there. It is used to securely copy files from one server to another over
SSH.
Compared to the scp command, which does a similar thing, rsync
makes the transfer a lot faster, and in case of an interruption, you could
restore/resume the transfer process.
In this tutorial, I will show you how to use the rsync command and copy
files from one server to another and also share a few useful tips!
Before you get started, you would need to have 2 Linux servers. I will
be using DigitalOcean for the demo and deploy 2 Ubuntu servers.
You can use my referral link to get a free $100 credit that you could use
to deploy your virtual machines and test the guide yourself on a few
DigitalOcean servers:
DigitalOcean $100 Free Credit
@
B
l
a
c
Transfer Files from local server to remote k
h
a
t
A
k
This is one of the most common causes. Essentially this is how you
would copy the files from the server that you are currently on (the
source server) to remote/destination server.
What you need to do is SSH to the server that is holding your files, cd to
the directory that you would like to transfer over:
cd /var/www/html
And then run:
rsync -avz user@your-remote-server.com:/home/user/dir/



## scp

The scp command relies on ssh for data transfer, so it requires an ssh
key or password to authenticate on the remote systems.
The colon (:) is how scp distinguish between local and remote
locations.
To be able to copy files, you must have at least read permissions on the
source file and write permission on the target system.
Be careful when copying files that share the same name and location on
both systems, scp will overwrite files without warning.
When transferring large files, it is recommended to run the scp
command inside a screen or tmux session.
@
B
l
a
c
The command k
h
sleep
a
t
A
k



## shutdown

The shutdown command lets you bring your system down in a secure
way. When shutdown is executed the system will notify all logged-in
users and disallow further logins. You have the option to shut down your
system immediately or after a specific time.
Only users with root (or sudo) privileges can use the shutdown
command.
Examples:
1. Shut down your system immediately:
sudo shutdown now
2. Shut down your system after 10 minutes:
sudo shutdown +10
3. Shut down your system with a message after 5 minutes:
sudo shutdown +5 "System will shutdown in 5 minutes"
Syntax:
@
B
l
a
c
k
shutdown [OPTIONS] [TIME] [MESSAGE]
h
a
t
A
k
Additional Flags and their Functionalities:
Short Flag Long Flag Description
-r - Reboot the system
-c - Cancel an scheduled shut down
@
B
l
a
c
The command k
h
dir
a
t
A
k



## sl

The sl command in Linux is a humorous program that runs a steam
locomotive(sl) across your terminal.
@
B
l
a
c
Installation k
h
a
t
A
k
Install the package before running.
sudo apt install sl
@
B
l
a
c
Syntax k
h
a
t
A
k
sl
@
B
l
a
c
The command k
h
echo
a
t
A
k



## sleep

The sleep command is used to create a dummy job. A dummy job helps
in delaying the execution. It takes time in seconds by default but a
small suffix(s, m, h, d) can be added at the end to convert it into any
other format. This command pauses the execution for an amount of
time which is defined by NUMBER.
Note: If you will define more than one NUMBER with sleep command
then this command will delay for the sum of the values.
Examples :
1. To sleep for 10s
sleep 10s
2. A more generalized command:
sleep NUMBER[SUFFIX]
@
B
l
a
c
Options k
h
a
t
A
k
It accepts the following options:
1. --help
display this help and exit
2. --version
output version information and exit
@
B
l
a
c
The command k
h
split
a
t
A
k



## split

The split command in Linux is used to split a file into smaller files.
Examples
1. Split a file into a smaller file using file name
split filename.txt
2. Split a file named filename into segments of 200 lines beginning
with prefix file
split -l 200 filename file
This will create files of the name fileaa, fileab, fileac, filead, etc. of 200
lines.
3. Split a file named filename into segments of 40 bytes with prefix
file
split -b 40 filename file
This will create files of the name fileaa, fileab, fileac, filead, etc. of 40
bytes.
4. Split a file using --verbose to see the files being created.
@
B
l
a
c
k
split filename.txt --verbose
h
a
t
A
k
Syntax:
split [options] filename [prefix]
Additional Flags and their Functionalities
Short
Long Flag Description
Flag
Generate suffixes of length N
-a --suffix-length=N
(default 2)
Append an additional SUFFIX to
--additional-suffix=SUFFIX
file names
-b --bytes=SIZE Put SIZE bytes per output file
Put at most SIZE bytes of
-C --line-bytes=SIZE
records per output file
Use numeric suffixes starting at
-d
0, not alphabetic
Same as -d, but allow setting
--numeric-suffixes[=FROM]
the start value
Use hex suffixes starting at 0,
-x
not alphabetic
Same as -x, but allow setting
--hex-suffixes[=FROM]
the start value
Do not generate empty output
-e --elide-empty-files
files with '-n'
Write to shell COMMAND;
--filter=COMMAND
file name is $FILE
Put NUMBER lines/records per
-l --lines=NUMBER
output file
Generate CHUNKS output files;
-n --number=CHUNKS
see explanation below
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
Use SEP instead of newline as t
A
the record separator;
k
-t --separator=SEP
'\0' (zero) specifies the NUL
character
Immediately copy input to
-u --unbuffered
output with '-n r/'
Print a diagnostic just before
--verbose each
output file is opened
--help Display this help and exit
Output version information and
--version
exit
The SIZE argument is an integer and optional unit (example: 10K is
10*1024). Units are K,M,G,T,P,E,Z,Y (powers of 1024) or KB,MB,
(powers of 1000).
CHUNKS may be:
CHUNKS Description
N Split into N files based on size of input
K/N Output Kth of N to stdout
l/N Split into N files without splitting lines/records
l/K/N Output Kth of N to stdout without splitting lines/records
r/N Like 'l' but use round robin distribution
r/K/N Likewise but only output Kth of N to stdout
@
B
l
a
c
The command k
h
stat
a
t
A
k



## ssh

The ssh command in Linux stands for "Secure Shell". It is a protocol
used to securely connect to a remote server/system. ssh is more secure
in the sense that it transfers the data in encrypted form between the
host and the client. ssh runs at TCP/IP port 22.
Examples:
1. Use a Different Port Number for SSH Connection:
ssh test.server.com -p 3322
2. -i ssh to remote server using a private key?
ssh -i private.key user_name@host
3. -l ssh specifying a different username
ssh -l alternative-username sample.ssh.com
Syntax:
ssh user_name@host(IP/Domain_Name)
@
B
l
a
c
k
ssh -i private.key user_name@host
h
a
t
A
k
ssh sample.ssh.com ls /tmp/doc
Additional Flags and their Functionalities:
Flag Description
Forces ssh to use protocol
-1
SSH-1 only.
Forces ssh to use protocol
-2
SSH-2 only.
-4 Allows IPv4 addresses only.
Authentication agent
-A connection forwarding is
enabled..
Authentication agent
-a connection forwarding is
disabled.
Bind to the address of
bind_interface before
attempting to connect to the
-B bind_interface
destination host. This is only
useful on systems with more
than one address.
Use bind_address on the
local machine as the source
-b bind_address address of the connection.
Only useful on systems with
more than one address.
Compresses all data
(including stdin, stdout,
stderr, and data for
-C
forwarded X11 and TCP
connections) for a faster
transfer of data.
@
B
l
a
c
Flag Description k
h
Selects the cipher
a
-c cipher_spec specification for encrypting t
A
the session.
k
Dynamic application-level
port forwarding. This
allocates a socket to listen to
port on the local side. When
a connection is made to this
-D [bind_address:]port port, the connection is
forwarded over the secure
channel, and the application
protocol is then used to
determine where to connect
to from the remote machine.
Append debug logs instead
-E log_file
of standard error.
Sets the escape character for
sessions with a pty (default:
‘~’). The escape character is
only recognized at the
beginning of a line. The
escape character followed by
a dot (‘.’) closes the
-e escape_char connection; followed by
control-Z suspends the
connection; and followed by
itself sends the escape
character once. Setting the
character to “none” disables
any escapes and makes the
session fully transparent.
Specifies a per-user
configuration file. The default
-F configfile
for the per-user configuration
file is ~/.ssh/config.
Requests ssh to go to
-f background just before
command execution.
@
B
l
a
c
Flag Description k
h
Causes ssh to print its
a
configuration after t
A
-G
evaluating Host and Match
k
blocks and exit.
Allows remote hosts to
-g connect to local forwarded
ports.
Specify the PKCS#11 shared
library ssh should use to
-I pkcs11 communicate with a
PKCS#11 token providing
keys.
A file from which the identity
-i identity_file key (private key) for public
key authentication is read.
Connect to the target host by
first making a ssh connection
to the pjump
-J [user@]host[:port] host[(/iam/jump-host) and
then establishing a TCP
forwarding to the ultimate
destination from there.
Enables GSSAPI-based
authentication and
-K forwarding (delegation) of
GSSAPI credentials to the
server.
Disables forwarding
-k (delegation) of GSSAPI
credentials to the server.
@
B
l
a
c
Flag Description k
h
Specifies that connections to
a
the given TCP port or Unix t
A
socket on the local (client)
k
host are to be forwarded to
the given host and port, or
Unix socket, on the remote
side. This works by allocating
-L a socket to listen to either a
[bind_address:]port:host:hostport, TCP port on the local side,
-L optionally bound to the
[bind_address:]port:remote_socket, specified bind_address, or to
-L local_socket:host:hostport, -L a Unix socket. Whenever a
local_socket:remote_socket connection is made to the
local port or socket, the
connection is forwarded over
the secure channel, and a
connection is made to either
host port hostport, or the
Unix socket remote_socket,
from the remote machine.
Specifies the user to log in as
-l login_name
on the remote machine.
Places the ssh client into
“master” mode for
connection sharing. Multiple -
M options places ssh into
“master” mode but with
-M
confirmation required using
ssh-askpass before each
operation that changes the
multiplexing state (e.g.
opening a new session).
A comma-separated list of
MAC (message
-m mac_spec authentication code)
algorithms, specified in order
of preference.
Do not execute a remote
-N command. This is useful for
just forwarding ports.
@
B
l
a
c
Flag Description k
h
-n Prevents reading from stdin.
a
t
Control an active connection A
multiplexing master process. k
When the -O option is
specified, the ctl_cmd
argument is interpreted and
passed to the master
process. Valid commands
are: “check” (check that the
master process is running),
-O ctl_cmd
“forward” (request
forwardings without
command execution),
“cancel” (cancel
forwardings), “exit” (request
the master to exit), and
“stop” (request the master to
stop accepting further
multiplexing requests).
Can be used to give options
in the format used in the
configuration file. This is
-o
useful for specifying options
for which there is no
separate command-line flag.
Port to connect to on the
-p, --port PORT
remote host.
@
B
l
a
c
Flag Description k
h
Queries ssh for the
a
algorithms supported for the t
A
specified version 2. The
k
available features are: cipher
(supported symmetric
ciphers), cipher-auth
(supported symmetric
ciphers that support
authenticated encryption),
help (supported query terms
for use with the -Q flag), mac
(supported message integrity
codes), kex (key exchange
algorithms), kex-gss (GSSAPI
key exchange algorithms),
-Q query_option
key (keytypes), key-cert
(certificate key types), key-
plain (non-certificate key
types), key-sig (all keytypes
and signature algorithms),
protocol-version (supported
SSH protocol versions), and
sig (supported signature
algorithms). Alternatively,
any keyword from
ssh_config(5) or
sshd_config(5) thattakes an
algorithm list may be used as
an alias for the
corresponding query_option.
Qiet mode. Causes most
-q warning and diagnostic
messages to be suppressed.
-R
Specifies that connections to
[bind_address:]port:host:hostport,
-R the given TCP port or Unix
[bind_address:]port:local_socket, socket on the remote
-R remote_socket:host:hostport, -R (server) host are to be
remote_socket:local_socket, -R forwarded to the local side.
[bind_address:]port
@
B
l
a
c
Flag Description k
h
Specifies the location of a
a
control socket for connection t
A
-S ctl_path sharing, or the string “none” k
to disable connection
sharing.
May be used to request
invocation of a subsystem on
the remote system.
Subsystems facilitate the use
-s of SSH as a secure transport
for other applications (e.g.
sftp(1)). The subsystem is
specified as the remote
command.
Disable pseudo-terminal
-T
allocation.
Force pseudo-terminal
allocation. This can be used
to execute arbitrary screen-
based programs on a remote
machine, which can be very
-t
useful, e.g. when
implementing menu services.
Multiple -t options force tty
allocation, even if ssh has no
local tty.
-V Display the version number.
Verbose mode. It echoes
everything it is doing while
establishing a connection. It
-v
is very useful in the
debugging of connection
failures.
@
B
l
a
c
Flag Description k
h
Requests that standard input
a
and output on the client be t
A
forwarded to host on port
k
over the secure channel.
Implies -N, -T,
-W host:port
ExitOnForwardFailure and
ClearAllForwardings, though
these can be overridden in
the configuration file or using
-o command line options.
Requests tunnel device
forwarding with the specified
tun devices between the
client (local_tun) and the
server (remote_tun). The
devices may be specified by
numerical ID or the keyword
“any”, which uses the next
available tunnel device. If
-w local_tun[remote_tun]
remote_tun is not specified,
it defaults to “any”. If the
Tunnel directive is unset, it
will be set to the default
tunnel mode, which is “point-
to-point”. If a different
Tunnel forwarding mode it
desired, then it should be
specified before -w.
Enables X11 forwarding (GUI
-X
Forwarding).
Disables X11 forwarding (GUI
-x
Forwarding).
Enables trusted X11
-Y
Forwarding.
Send log information using
the syslog system module.
-y
By default this information is
sent to stderr.
300



## stat

The stat command lets you display file or file system status. It gives
you useful information about the file (or directory) on which you use it.
Examples:
1. Basic command usage
stat file.txt
2. Use the -c (or --format) argument to only display information you
want to see (here, the total size, in bytes)
stat file.txt -c %s
Syntax:
stat [OPTION] [FILE]
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
-L --dereference Follow links
Display file system status instead of file
-f --file-system
status
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
-c --format=FORMAT Specify the format (see below) t
A
-t --terse Print the information in terse form k
Specify how to use cached attributes. Can
- --cached=MODE
be: always, never, or default
Like --format, but interpret backslash
- --printf=FORMAT
escapes (\n, \t, )
- --help Display the help and exit
- --version Output version information and exit
Example of Valid Format Sequences for Files:
Format Description
%a Permission bits in octal
%A Permission bits and file type in human readable form
%d Device number in decimal
%D Device number in hex
%F File type
%g Group ID of owner
%G Group name of owner
%h Number of hard links
%i Inode number
%m Mount point
%n File name
%N Quoted file name with dereference if symbolic link
%s Total size, in bytes
%u User ID of owner
%U User name of owner
%w Time of file birth, human-readable; - if unknown
%x Time of last access, human-readable
%y Time of last data modification, human-readable
%z Time of last status change, human-readable
@
B
l
a
c
The command k
h
useradd
a
t
A
k



## tail

The tail command prints the last ten lines of a file.
Example:
tail filename.txt
Syntax:
tail [OPTION] [FILENAME]
Get a specific number of lines with tail:
Use the -n option with a number(should be an integer) of lines to
display.
Example:
tail -n 10 foo.txt
This command will display the last ten lines of the file foo.txt.
Refresh the output on any new entry in a file
It is possible to let tail output any new line added to the file you are
looking into. So, if a new line is written to the file, it will immediately be
shown in your output. This can be done using the --follow or -f
@
B
l
a
c
option. This is especially useful for monitoring log files. k
h
a
Example: t
A
k
tail -f foo.txt
Syntax:
tail -n <number> foo.txt
Additional Flags and their Functionalities
Short
Long Flag Description
Flag
Output the last NUM bytes;
or use -c +NUM to
-c --bytes=[+]NUM
output starting with byte
NUM of each file
Output appended data as the
file grows;
-f --follow[={name|descriptor}]
an absent option argument
means 'descriptor'
Same as --follow=name --
-F
retry
Output the last NUM lines,
instead of the last 10;
-n --lines=[+]NUM
or use -n +NUM to output
starting with line NUM
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
with --follow=name, reopen a t
A
FILE which has not
k
changed size after N (default
5) iterations
to see if it has been unlinked
--max-unchanged-stats=N
or rename
(this is the usual case of
rotated log files);
with inotify, this option is
rarely useful
with -f, terminate after
--pid=PID
process ID, PID dies
Never output headers giving
-q --quiet, --silent
file names
keep trying to open a file if it
`` --retry
is inaccessible
With -f, sleep for
approximately N seconds
(default 1.0) between
-s --sleep-interval=N iterations;
with inotify and --pid=P,
check process P at
least once every N seconds
Always output headers giving
-v --verbose
file names
Line delimiter is NUL, not
-z --zero-terminated
newline
--help Display this help and exit
Output version information
--version
and exit
@
B
l
a
c
The command k
h
pwd
a
t
A
k
The pwd stands for Print Working Directory. It prints the path of the
current working directory, starting from the root.
Example:
pwd
The output would be your current directory:
/home/your_user/some_directory
Syntax:
pwd [OPTION]
Tip: You can also check this by printing out the $PWD variable:
echo $PWD
The output would be the same as of the pwd command.
Options:
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
If the environment variable $PWD contains an t
A
absolute name of the current directory with no "."
k
-L --logical or ".." components, then output those contents,
even if they contain symbolic links. Otherwise, fall
back to default (-P) behavior.
Print a fully resolved name for the current
-P --physical directory, where all components of the name are
actual directory names, and not symbolic links.
--help Display a help message, and exit.
--version Display version information, and exit.
By default, pwd' behaves as if -L' were specified.
@
B
l
a
c
The Command k
h
touch
a
t
A
k



## tar

The tar command stands for tape archive, is used to create Archive
and extract the Archive files. This command provides archiving
functionality in Linux. We can use tar command to create compressed
or uncompressed Archive files and also maintain and modify them.
Examples:
1. To create a tar file in abel directory:
tar -cvf file-14-09-12.tar /home/abel/
2. To un-tar a file in the current directory:
tar -xvf file-14-09-12.tar
Syntax:
tar [options] [archive-file] [file or directory to be archived
Additional Flags and their Functionalities:
Use Flag Description
-c Creates Archive
-x Extract the archive
-f Creates archive with given filename
@
B
l
a
c
Use Flag Description k
h
-t Displays or lists files in archived file
a
t
-u Archives and adds to an existing archive file A
k
-v Displays Verbose Information
-A Concatenates the archive files
-z zip, tells tar command that creates tar file using gzip
-j Filter archive tar file using tbzip
w Verify a archive file
update or add file or directory in already existed .tar
r
file
-? Displays a short summary of the project
Find the difference between an archive and file
-d
system
--usage shows available tar options
--version Displays the installed tar version
--show-defaults Shows default enabled options
Option Flag Description
Check device numbers during
--check-device
incremental archive
Used to allow compatibility with GNU-
-g
format incremental ackups
Used to detect holes in the sparse
--hole-detection
files
Used to allow compatibility with old
-G
GNU-format incremental backups
Don't exit the program on file read
--ignore-failed-read
errors
Set the dump level for created
--level
archives
-n Assume the archive is seekable
Do not check device numbers when
--no-check-device
creating archives
--no-seek Assume the archive is not seekable
`Process only the Nth occurrence of
--occurrence=N
each file
@
B
l
a
c
Option Flag Description k
h
`Disable use of potentially harmful
a
--restrict
options t
A
Set version of the sparce format to k
--sparse-version=MAJOR,MINOR
use
-S Handle sparse files efficiently.
Overwright control Flag Description
-k Don't replace existing files
Don't replace existing files that are newer
--keep-newer-files
than the archives version
--keep-directory-symlink Don't replace existing symlinks
--no-overwrite-dir Preserve metadata of existing directories
--one-top-level=DIR Extract all files into a DIR
--overwrite Overwrite existing files
--overwrite-dir Overwrite metadata of directories
Recursivly remove all files in the directory
--recursive-unlink
before extracting
Remove files after adding them to a
--remove-files
directory
Don't replace existing files when
--skip-old-files
extracting
-u Remove each file before extracting over it
-w Verify the archive after writing it
@
B
l
a
c
The command k
h
gunzip
a
t
A
k



## touch

The touch command modifies a file's timestamps. If the file specified
doesn't exist, an empty file with that name is created.
Syntax
touch [OPTION] FILE
Options
Short
Long Flag Description
Flag
-a - Change only the access time.
-c --no-create Do not create any files.
-d Parse STRING and use it instead of the
--date=STRING
STRING current time.
(Ignored) This option does nothing but is
-f - accepted to provide compatibility with
BSD versions of the touch command.
Affect each symbolic link instead of any
referenced file (useful only on systems
-h --no-dereference that can change the timestamps of a
symlink). This option implies -c, nothing
is created if the file does not exist.
-m - Change only the modification time.
Use this file's times instead of the current
-r=FILE --reference=FILE
time.
Use the numeric time STAMP instead of
-t
- the current time. The format of STAMP is
STAMP
[[CC]YY]MMDDhhmm[.ss].
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
An alternate way to specify which type of t
A
time is set (e.g. access, modification, or
k
- --time=WORD
change). This is equivalent to specifying
-a or -m.
WORD is access, atime, or use: equivalent to -a.
WORD is modify or mtime: equivalent to -m.
An alternate way to specify what type of time to set (as with -a and -
m).| |
-
|--help|Display a help message, and exit.| |
-
|--version|Display version information, and exit.|
Examples
1. If file.txt exists, set all of its timestamps to the current system
time. If file.txt doesn't exist, create an empty file with that name.
touch file.txt
2. If file.txt exists, set its times to the current system time. If it does
not exist, do nothing.
touch -c file.txt
3. Change the access time of file.txt. The modification time is not
changed. The change time is set to the current system time. If
file.txt does not exist, it is created.
@
B
l
a
c
k
touch -a file.txt
h
a
t
A
4. Change the times of file symboliclink. If it's a symbolic link, k
change the times of the symlink, NOT the times of the referenced
file.
touch -h symboliclink
5. Change the access and modification times of file-b.txt to match
the times of file-a.txt. The change time will be set to the current
system time. If file-b.txt does not exist, it is not created. Note,
file-a.txt must already exist in this context.
touch -cr file-a.txt file-b.txt
6. Set the access time and modification time of file.txt to February
1st of the current year. The change time is set to the current
system time.
touch -d "1 Feb" file.txt
@
B
l
a
c
The Command k
h
cal
a
t
A
k



## uname

The uname command lets you print out system information and defaults
to outputting the kernel name.
@
B
l
a
c
Syntax: k
h
a
t
A
k
$ uname [OPTION]
@
B
l
a
c
Examples k
h
a
t
A
k
1. Print out all system information.
$ uname -a
2. Print out the kernel version.
$ uname -v
@
B
l
a
c
Options k
h
a
t
A
k
Short
Long Flag Description
Flag
Print all information, except omit
-a --all processor and hardware platform if
unknown.
-s --kernel-name Print the kernel name.
-n --nodename Print the network node hostname.
-r --kernel-release Print the kernel release.
-v --kernel-version Print the kernel version.
-m --machine Print the machine hardware name.
Print the processor type (non-
-p --processor
portable).
Print the hardware platform (non-
-i --hardware-platform
portable).
-o --operating-system Print the operating system.
@
B
l
a
c
The command k
h
mkdir
a
t
A
k



## uniq

The uniq command in Linux is a command line utility that reports or
filters out the repeated lines in a file. In simple words, uniq is the tool
that helps you to detect the adjacent duplicate lines and also deletes
the duplicate lines. It filters out the adjacent matching lines from the
input file(that is required as an argument) and writes the filtered data
to the output file .
Examples:
In order to omit the repeated lines from a file, the syntax would be the
following:
uniq kt.txt
In order to tell the number of times a line was repeated, the syntax
would be the following:
uniq -c kt.txt
In order to print repeated lines, the syntax would be the following:
uniq -d kt.txt
In order to print unique lines, the syntax would be the following:
@
B
l
a
c
k
uniq -u kt.txt
h
a
t
A
In order to allows the N fields to be skipped while comparing k
uniqueness of the lines, the syntax would be the following:
uniq -f 2 kt.txt
In order to allows the N characters to be skipped while comparing
uniqueness of the lines, the syntax would be the following:
uniq -s 5 kt.txt
In order to to make the comparison case-insensitive, the syntax would
be the following:
uniq -i kt.txt
Syntax:
uniq [OPTION] [INPUT[OUTPUT]]
Possible options:
Flag Description Params
It tells how many times a line was repeated by
-c -
displaying a number as a prefix with the line.
It only prints the repeated lines and not the lines
-d -
which aren’t repeated.
@
B
l
a
c
Flag Description Paramks
h
By default, comparisons done are case sensitive
a
-i but with this option case insensitive comparisons - t
A
can be made.
k
It allows you to skip N fields(a field is a group of
-f characters, delimited by whitespace) of a line N
before determining uniqueness of a line.
It doesn’t compares the first N characters of each
line while determining uniqueness. This is like the
-s N
-f option, but it skips individual characters rather
than fields.
-u It allows you to print only unique lines. -
It will make a line end with 0 byte(NULL), instead
-z -
of a newline.
-w It only compares N characters in a line. N
--help It displays a help message and exit. -
--version It displays version information and exit. -
@
B
l
a
c
The command k
h
RPM
a
t
A
k
rpm - RPM Package Manager
rpm is a powerful Package Manager, which can be used to build,
install, query, verify, update, and erase individual software packages. A
package consists of an archive of files and meta-data used to install
and erase the archive files. The meta-data includes helper scripts, file
attributes, and descriptive information about the package. Packages
come in two varieties: binary packages, used to encapsulate software to
be installed, and source packages, containing the source code and
recipe necessary to produce binary packages.
One of the following basic modes must be selected: Query, Verify,
Signature Check, Install/Upgrade/Freshen, Uninstall, Initialize
Database, Rebuild Database, Resign, Add Signature, Set
Owners/Groups, Show Querytags, and Show Configuration.
General Options
These options can be used in all the different modes.
Short
Long Flag Description
Flag
-? --help Print a longer usage message then normal.
Print a single line containing the version number of rpm being
- --version
used.
Print as little as possible - normally only error messages will be
- --quiet
displayed.
Print verbose information - normally routine progress messages
-v -
will be displayed.
-vv - Print lots of ugly debugging information.
@
B
l
a
c
Short
k
Long Flag Description
Flag h
a
Each of the files in the colon separated FILELIST is read
t
sequentially by rpm for configuration information. Only the first A
- --rcfile FILELIST file in the list must exist, and tildes will be expanded to the value k
of $HOME. The default FILELIST is
/usr/lib/rpm/rpmrc:/usr/lib/rpm/redhat/rpmrc:/etc/rpmrc:~/.rpmrc.
- --pipe CMD Pipes the output of rpm to the command CMD.
--dbpath Use the database in DIRECTORY rather than the default path
-
DIRECTORY /var/lib/rpm
Use the file system tree rooted at DIRECTORY for all operations.
Note that this means the database within DIRECTORY will be
--root
- used for dependency checks and any scriptlet(s) (e.g. %post if
DIRECTORY
installing, or %prep if building, a package) will be run after a
chroot(2) to DIRECTORY.
--define='MACRO
-D Defines MACRO with value EXPR.
EXPR'
-E --eval='EXPR' Prints macro expansion of EXPR.
@
B
l
a
c
Synopsis k
h
a
t
A
k
@
B
l
a
c
Querying and Verifying Packages: k
h
a
t
A
k
rpm {-q|--query} [select-options] [query-options]
rpm {-V|--verify} [select-options] [verify-options]
rpm --import PUBKEY 
rpm {-K|--checksig} [--nosignature] [--nodigest] PACKAGE_FILE

@
B
l
a
c
Installing, Upgrading, and Removing Packages: k
h
a
t
A
k
rpm {-i|--install} [install-options] PACKAGE_FILE 
rpm {-U|--upgrade} [install-options] PACKAGE_FILE 
rpm {-F|--freshen} [install-options] PACKAGE_FILE 
rpm {-e|--erase} [--allmatches] [--nodeps] [--noscripts] [--
notriggers] [--test] PACKAGE_NAME 
@
B
l
a
c
Miscellaneous: k
h
a
t
A
k
rpm {--initdb|--rebuilddb}
rpm {--addsign|--resign} PACKAGE_FILE
rpm {--querytags|--showrc}
rpm {--setperms|--setugids} PACKAGE_NAME .
query-options
[--changelog] [-c,--configfiles] [-d,--docfiles] [--dump]
[--filesbypkg] [-i,--info] [--last] [-l,--list]
[--provides] [--qf,--queryformat QUERYFMT]
[-R,--requires] [--scripts] [-s,--state]
[--triggers,--triggerscripts]
verify-options
[--nodeps] [--nofiles] [--noscripts]
[--nodigest] [--nosignature]
[--nolinkto] [--nofiledigest] [--nosize] [--nouser]
[--nogroup] [--nomtime] [--nomode] [--nordev]
[--nocaps]
install-options
@
B
l
a
c
k
[--aid] [--allfiles] [--badreloc] [--excludepath OLDPATH]
h
[--excludedocs] [--force] [-h,--hash] a
t
[--ignoresize] [--ignorearch] [--ignoreos] A
[--includedocs] [--justdb] [--nodeps] k
[--nodigest] [--nosignature] [--nosuggest]
[--noorder] [--noscripts] [--notriggers]
[--oldpackage] [--percent] [--prefix NEWPATH]
[--relocate OLDPATH=NEWPATH]
[--replacefiles] [--replacepkgs]
[--test]
@
B
l
a
c
The command k
h
scp
a
t
A
k
SCP (secure copy) is a command-line utility that allows you to securely
copy files and directories between two locations.
Both the files and passwords are encrypted so that anyone snooping on
the traffic doesn't get anything sensitive.
Different ways to copy a file or directory:
From local system to a remote system.
From a remote system to a local system.
Between two remote systems from the local system.
Examples:
1. To copy the files from a local system to a remote system:
scp /home/documents/local-file root@{remote-ip-address}:/home/
2. To copy the files from a remote system to the local system:
scp root@{remote-ip-address}:/home/remote-file
/home/documents/
3. To copy the files between two remote systems from the local
system.
@
B
l
a
c
k
scp root@{remote1-ip-address}:/home/remote-file root@{remote2-
h
ip-address}/home/ a
t
A
k
4. To copy file though a jump host server.
scp /home/documents/local-file -oProxyJump=<jump-host-ip>
root@{remote-ip-address}/home/
On newer version of scp on some machines you can use the above
command with a -J flag.
scp /home/documents/local-file -J <jump-host-ip> root@{remote-
ip-address}/home/
Syntax:
scp [OPTION] [user@]SRC_HOST:]file1 [user@]DEST_HOST:]file2
OPTION - scp options such as cipher, ssh configuration, ssh port,
limit, recursive copy …etc.
[user@]SRC_HOST:]file1 - Source file
[user@]DEST_HOST:]file2 - Destination file
Local files should be specified using an absolute or relative path, while
remote file names should include a user and host specification.
scp provides several that control every aspect of its behaviour. The
most widely used options are:
Short Long
Description
Flag Flag
-P - Specifies the remote host ssh port.
@
B
l
a
c
Short Long k
Description
h
Flag Flag
a
-p - Preserves files modification and access times. t
A
Use this option if you want to suppress the progress k
-q -
meter and non-error messages.
This option forces scp to compresses the data as it
-C -
is sent to the destination machine.
-r - This option tells scp to copy directories recursively.
Before you begin



## unzip

The unzip command extracts all files from the specified ZIP archive to
the current directory.
Examples:
In order to extract the files the syntax would be the following:
unzip myZipFile.zip
To unzip a ZIP file to a different directory than the current one, don't
forget to add the -d flag:
unzip myZipFile.zip -d /path/to/directory
To unzip a ZIP file and exclude specific file or files or directories from
being extracted, don't forget to add the -x flag:
unzip myZipFile.zip -x file1.txt file2.txt
Syntax:
unzip zipFileName [OPTION] [PARAMS]
@
B
l
a
c
k
Possible options: h
a
t
A
Flag Description Params
k
-d Unzip an archive to a different directory. /path/to/directory
Extract the archive but do not extract the
-x filename(s)
specified files.
Unzip without creating new folders, if the
-j -
zipped archive contains a folder structure.
Lists the contents of an archive file without
-l -
extracting it.
Do not overwrite existing files; supply an
-n -
alternative filename instead.
-o Overwrite files. -
Supplies a password to unzip a protected
-P password
archive file.
Unzips without writing status messages to the
-q -
standard output.
-t Tests whether an archive file is valid. -
Displays detailed (verbose) information about
-v -
the archive without extracting it.
@
B
l
a
c
The command k
h
shutdown
a
t
A
k



## useradd

The useradd command is used to add or update user accounts to the
system.
Examples:
To add a new user with the useradd command the syntax would be the
following:
useradd NewUser
To add a new user with the useradd command and give a home
directory path for this new user the syntax would be the following:
useradd -d /home/NewUser NewUser
To add a new user with the useradd command and give it a specific id
the syntax would be the following:
useradd -u 1234 NewUser
Syntax:
useradd [OPTIONS] NameOfUser
@
B
l
a
c
k
Possible options: h
a
t
A
Flag Description Params
k
The new user will be created using
-d /path/to/directory as the value for the /path/to/directory
user's login directory
-u The numerical value of the user's ID ID
-g Create a user with specific group id GroupID
-M Create a user without home directory -
DATE (format: YYYY-
-e Create a user with expiry date
MM-DD)
-c Create a user with a comment COMMENT
-s Create a user with changed login shell /path/to/shell
Set an unencrypted password for the
-p PASSWORD
user
@
B
l
a
c
The command k
h
userdel
a
t
A
k



## userdel

The userdel command is used to delete a user account and related
files
Examples:
To delete a user with the userdel command the syntax would be the
following:
userdel userName
To force the removal of a user account even if the user is still logged in,
using the userdel command the syntax would be the following:
userdel -f userName
To delete a user along with the files in the user’s home directory using
the userdel command the syntax would be the following:
userdel -r userName
Syntax:
userdel [OPTIONS] userName
@
B
l
a
c
k
Possible options: h
a
t
A
Flag Description
k
Force the removal of the specified user account even if the user
-f
is logged in
Remove the files in the user’s home directory along with the
-r
home directory itself and the user’s mail spool
Remove any SELinux(Security-Enhanced Linux) user mapping for
-Z
the user’s login.
@
B
l
a
c
The command k
h
usermod
a
t
A
k



## usermod

The usermod command lets you change the properties of a user in Linux
through the command line. After creating a user we sometimes have to
change their attributes, like their password or login directory etc. So in
order to do that we use the usermod command.
Syntax:
usermod [options] USER
Note : Only superuser (root) is allowed to execute usermod
command
Options and their Functionalities:
Option Description
-a to add anyone of the group to a secondary group
-c to add comment field for the useraccount
-d to modify the directory for any existing user account
-g change the primary group for a User
-G to add supplementary groups
-l to change existing user login name
-L to lock system user account
to move the contents of the home directory from existing
-m
home dir to new dir
-p to create an un-encrypted password
-s to create a specified shell for new accounts
-u to assigned UID for the user account
@
B
l
a
c
Option Description k
h
-U to unlock any locked user
a
t
A
k
Examples:
1. To add a comment/description for a user:
sudo usermod -c "This is test user" test_user
2. To change the home directory of a user:
sudo usermod -d /home/sam test_user
3. To change the expiry date of a user:
sudo usermod -e 2021-10-05 test_user
4. To change the group of a user:
sudo usermod -g sam test_user
5. To change user login name:
sudo usermod -l test_account test_user
6. To lock a user:
sudo usermod -L test_user
7. To unlock a user:
@
B
l
a
c
k
sudo usermod -U test_user
h
a
t
A
8. To set an unencrypted password for the user: k
sudo usermod -p test_password test_user
9. To create a shell for the user:
sudo usermod -s /bin/sh test_user
10. To change the user id of a user:
sudo usermod -u 1234 test_user
@
B
l
a
c
The command k
h
ionice
a
t
A
k



## vmstat

The vmstat command lets you monitor the performance of your system.
It shows you information about your memory, disk, processes, CPU
scheduling, paging, and block IO. This command is also referred to as
virtual memory statistic report.
The very first report that is produced shows you the average details
since the last reboot and after that, other reports are made which
report over time.
vmstat
As you can see it is a pretty useful little command. The most important
things that we see above are the free, which shows us the free space
that is not being used, si shows us how much memory is swapped in
every second in kB, and so shows how much memory is swapped out
each second in kB as well.
vmstat -a
If we run vmstat -a, it will show us the active and inactive memory of
the system running.
vmstat -d
The vmstat -d command shows us all the disk statistics.
@
B
l
a
c
k
h
As you can see this is a pretty useful little command that shows you a
t
A
different statistics about your virtual memory
k
@
B
l
a
c
The command k
h
mpstat
a
t
A
k



## w

The w command displays information about the users that are currently
active on the machine and their processes.
Examples:
1. Running the w command without arguments shows a list of logged
on users and their processes.
w
2. Show information for the user named hope.
w hope
Syntax:
finger [-l] [-m] [-p] [-s] [username]
Additional Flags and their Functionalities:
Short
Long Flag Description
Flag
-h --no-header Don't print the header.
@
B
l
a
c
Short k
Long Flag Description
h
Flag
a
Ignores the username while figuring out the t
A
current process and cpu times. (To see an
k
-u --no-current
example of this, switch to the root user with
su and then run both w and w -u.)
Display abbreviated output (don't print the
-s --short
login time, JCPU or PCPU times).
Toggle printing the from (remote hostname)
field. The default as released is for the from
field to not be printed, although your system
-f --from
administrator or distribution maintainer may
have compiled a version where the from field
is shown by default.
--help - Display a help message, and exit.
-V --version Display version information, and exit.
Old style output (prints blank space for idle
-o --old-style
times less than one minute).
Show information about the specified the user
user -
only.
Additional Information
The header of the output shows (in this order): the current time, how
long the system has been running, how many users are currently
logged on, and the system load averages for the past 1, 5, and 15
minutes.
The following entries are displayed for each user:
login name the tty
name the remote
host they are
logged in from the amount of time they are logged in their
idle time JCPU
PCPU
@
B
l
a
c
command line of their current process k
h
a
The JCPU time is the time used by all processes attached to the tty. It t
A
does not include past background jobs, but does include currently k
running background jobs.
The PCPU time is the time used by the current process, named in the
"what" field.
@
B
l
a
c
The command k
h
whoami
a
t
A
k



## wget

The wget command is used for downloading files from the Internet. It
supports downloading files using HTTP, HTTPS and FTP protocols. It
allows you to download several files at once, download in the
background, resume downloads, limit the bandwidth, mirror a website,
and much more.
@
B
l
a
c
Syntax k
h
a
t
A
k
The wget syntax requires you to define the downloading options and the
URL the to be downloaded file is coming from.
$ wget [options] [URL]
Examples
In this example we will download the Ubuntu 20.04 desktop iso file from
different sources. Go over to your terminal or open a new one and type
in the below wget. This will stat the download. The download may take
a few minutes to complete.
1. Starting a regular download
wget
https://releases.ubuntu.com/20.04/ubuntu-20.04.3-desktop-amd64
.iso
2. You can resume a download using the -c option
wget -c
https://mirrors.piconets.webwerks.in/ubuntu-mirror/ubuntu-rele
ases/20.04.3/ubuntu-20.04.3-desktop-amd64.iso
3. To download in the background, use the -b option
@
B
l
a
c
k
wget -b
h
https://mirrors.piconets.webwerks.in/ubuntu-mirror/ubuntu-rele a
t
ases/20.04.3/ubuntu-20.04.3-desktop-amd64.iso A
k
@
B
l
a
c
More options k
h
a
t
A
k
On top of downloading, wget provides many more features, such as
downloading multiple files, dowloading in the background, limiting
download bandwith and resuming stopped downloads. View all wget
options in its man page.
man wget
Additional Flags and their Functionalities
Short
Description
Flag
-v prints version of the wget available on your system
-h print help message displaying all the possible options
This option is used to send a process to the background as
-b
soon as it starts.
This option is used to set number of retries to a specified
-t
number of times
-c This option is used to resume a partially downloaded file
@
B
l
a
c
The command k
h
curl
a
t
A
k
In linux, curl is a tool to transfer data from or to a server, using one of
the supported protocols(DICT, FILE ,FTP, FTPS, GOPHER, HTTP, HTTPS,
IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMB,
SMBS, SMTP, SMTPS, TELNET and TFTP).
@
B
l
a
c
Example : k
h
a
t
A
k
$ curl example.com
The command will print the source code of the example.com homepage
in the terminal window.
@
B
l
a
c
The syntax of the curl command is : k
h
a
t
A
k
$ curl [options] <url>
@
B
l
a
c
Options : k
h
a
t
A
k
Options start with one or two dashes. Many of the options require an
additional value next to them.
The short "single-dash" form of the options, -d for example, may be
used with or without a space between it and its value, although a space
is a recommended separator. The long "double-dash" form, -d, --data
for example, requires a space between it and its value.
Short version options that don't need any additional values can be used
immediately next to each other, like for example you can specify all the
options -O, -L and -v at once as -OLv.
In general, all boolean options are enabled with --option and yet again
disabled with --no-option. That is, you use the exact same option
name but prefix it with no-. However, in this list we mostly only list and
show the --option version of them. (This concept with --no options
was added in 7.19.0. Previously most options were toggled on/off
through repeated use of the same command line option.)
@
B
l
a
c
Installation: k
h
a
t
A
k



## whatis

The whatis command is used to display one-line manual page
descriptions for commands. It can be used to get a basic understanding
of what a (unknown) command is used for.
Examples of uses:
1. To display what ls is used for:
whatis ls
2. To display the use of all commands which start with make, execute
the following:
whatis -w make*
Syntax:
whatis [-OPTION] [KEYWORD]
Additional Flags and their Functionalities:
Short Flag Long Flag Description
-d --debug Show debugging messages
-r --regex Interpret each keyword as a regex
-w --wildcard The keyword(s) contain wildcards
@
B
l
a
c
The command k
h
who
a
t
A
k



## who

The who command lets you print out a list of logged-in users, the
current run level of the system and the time of last system boot.
Examples
1. Print out all details of currently logged-in users
who -a
2. Print out the list of all dead processes
who -d -H
Syntax:
who [options] [filename]
Additional Flags and their Functionalities
Short Flag Description
-r prints all the current runlevel
-d print all the dead processes
print all the login names and total number of logged on
-q
users
-h print the heading of the columns displayed
@
B
l
a
c
Short Flag Description k
h
-b print the time of last system boot
a
t
A
018-the-free-command.md k
@
B
l
a
c
The command k
h
free
a
t
A
k



## whoami

The whoami command displays the username of the current effective
user. In other words it just prints the username of the currently logged-
in user when executed.
To display your effective user id just type whoami in your terminal:
manish@godsmack:~$ whoami
# Output:
manish
Syntax:
whoami [-OPTION]
There are only two options which can be passed to it :
--help: Used to display the help and exit
Example:
whoami --help
Output:
@
B
l
a
c
k
Usage: whoami [OPTION]
h
Print the user name associated with the current effective user a
t
ID. A
Same as id -un. k
--help display this help and exit
--version output version information and exit
--version: Output version information and exit
Example:
whoami --version
Output:
whoami (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later
<https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute
it.
There is NO WARRANTY, to the extent permitted by law.
Written by Richard Mlynarik.
@
B
l
a
c
The command k
h
history
a
t
A
k
If you type history you will get a list of the last 500 commands used.
This gives you the possibility to copy and paste commands that you
executed in the past.
This is powerful in combination with grep. So you can search for a
command in your command history.
Examples:
1. If you want to search in your history for artisan commands you ran
in the past.
history | grep artisan
2. If you only want to show the last 10 commands you can.
history 10
@
B
l
a
c
The Command k
h
login
a
t
A
k



## whois

The whois command in Linux to find out information about a domain,
such as the owner of the domain, the owner’s contact information, and
the nameservers that the domain is using.
Examples:
1. Performs a whois query for the domain name:
whois {Domain_name}
2. -H option omits the lengthy legal disclaimers that many domain
registries deliver along with the domain information.
whois -H {Domain_name}
Syntax:
whois [ -h HOST ] [ -p PORT ] [ -aCFHlLMmrRSVx ] [ -g
SOURCE:FIRST-LAST ]
[ -i ATTR ] [ -S SOURCE ] [ -T TYPE ] object
whois -t TYPE
@
B
l
a
c
k
whois -v TYPE
h
a
t
A
k
whois -q keyword
Additional Flags and their Functionalities:
Flag Description
-h HOST, --host HOST Connect to HOST.
Do not display the legal disclaimers some
-H
registries like to show you.
-p, --port PORT Connect to PORT.
--verbose Be verbose.
--help Display online help.
Display client version information. Other
options are flags understood by
--version
whois.ripe.net and some other RIPE-like
servers.
-a Also search all the mirrored databases.
Return brief IP address ranges with abuse
-b
contact.
Disable object filtering (show the e-mail
-B
addresses)
Return the smallest IP address range with a
-c
reference to an irt object.
Return the reverse DNS delegation object
-d
too.
Search updates from SOURCE database
between FIRST and LAST update serial
-g SOURCE:FIRST-LAST
number. It's useful to obtain Near Real Time
Mirroring stream.
-G Disable grouping of associated objects.
Search objects having associated attributes.
-i ATTR[,ATTR] ATTR is attribute name. Attribute value is
positional OBJECT argument.
@
B
l
a
c
Flag Description k
h
Return primary key attributes only. Exception
a
is members attribute of set object which is t
A
-K always returned. Another exceptions are all k
attributes of objects organisation, person,
and role that are never returned.
-l Return the one level less specific object.
-L Return all levels of less specific objects.
-m Return all one level more specific objects.
-M Return all levels of more specific objects.
Return list of keywords supported by server.
KEYWORD can be version for server version,
-q KEYWORD
sources for list of source databases, or types
for object types.
Disable recursive look-up for contact
-r
information.
Disable following referrals and force showing
-R
the object from the local copy in the server.
Request the server to search for objects
mirrored from SOURCES. Sources are
-s SOURCE[,SOURCE] delimited by comma and the order is
significant. Use -q sources option to obtain
list of valid sources.
-t TYPE Return the template for a object of TYPE.
Restrict the search to objects of TYPE.
-T TYPE[,TYPE]
Multiple types are separated by a comma.
Return the verbose template for a object of
-v TYPE
TYPE.
Search for only exact match on network
-x
address prefix.
@
B
l
a
c
The command k
h
ssh
a
t
A
k



## yes

The yes command in linux is used to print a continuous output stream
of given STRING. If STRING is not mentioned then it prints ‘y’. It outputs
a string repeatedly unit killed (using something like ctrl + c).
Examples :
1. Prints hello world infinitely in the terminal until killed :
yes hello world
2. A more generalized command:
yes [STRING]
@
B
l
a
c
Options k
h
a
t
A
k
It accepts the following options:
1. --help
display this help and exit
2. --version
output version information and exit
@
B
l
a
c
The command k
h
last
a
t
A
k
This command shows you a list of all the users that have logged in and
out since the creation of the var/log/wtmp file. There are also some
parameters you can add which will show you for example when a
certain user has logged in and how long he was logged in for.
If you want to see the last 5 logs, just add -5 to the command like this:
last -5
And if you want to see the last 10, add -10.
Another cool thing you can do is if you add -F you can see the login and
logout time including the dates.
last -F
There are quite a lot of stuff you can view with this command. If you
need to find out more about this command you can run:
last --help
@
B
l
a
c
The command k
h
locate
a
t
A
k



## zip

The zip command is used to compress files and reduce their size. It
outputs an archive containing one or more compressed files or
directories.
Examples:
In order to compress a single file with the zip command the syntax
would be the following:
zip myZipFile.zip filename.txt
This also works with multiple files as well:
zip multipleFiles.zip file1.txt file2.txt
If you are compressing a whole directory, don't forget to add the -r
flag:
zip -r zipFolder.zip myFolder/
Syntax:
zip [OPTION] zipFileName filesList
@
B
l
a
c
k
Possible options: h
a
t
A
Flag Description
k
Removes the file from the zip archive. After creating a zip file,
-d
you can remove a file from the archive using the -d option
Updates the file in the zip archive. This option can be used to
update the specified list of files or add new files to the existing
-u zip file. Update an existing entry in the zip archive only if it has
been modified more recently than the version already in the zip
archive.
-m Deletes the original files after zipping.
To zip a directory recursively, it will recursively zip the files in a
-r directory. This option helps to zip all the files present in the
specified directory.
-x Exclude the files in creating the zip
Verbose mode or print diagnostic version info. Normally, when
applied to real operations, this option enables the display of a
-v
progress indicator during compression and requests verbose
diagnostic info about zip file structure oddities
@
B
l
a
c
The command k
h
unzip
a
t
A
k


