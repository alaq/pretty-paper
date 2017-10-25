#
# goal: to convert as much of an html document as possible to an
# equivalent sed script.
# i understand that, because of this approach, this can never be 100%
# accurate, but really what I'm after is the conversion of things
# like tables and lists.
# note that my html tags are pretty accurate here, but my latex tags
# leave some things to be desired.
#
s?&gt;?>?g
s?&lt;?<?g
s?&nbsp;? ?g

s?<html>??ig
s?</html>??ig

s?<head>??ig
s?</head>??ig

s?<title>\([^<]*\)</title>?\\section*{\1}?ig

s?<body>?\\begin{document}?ig
s?</body>?\\end{document}?ig

# i don't know what the latex tag should be here for a paragraph.
s?<p>\([^<]*\)</p>?{\1}?ig

s?<center>??ig
s?</center>??ig

#-------#
# TABLE #
#-------#
s?<table.*>?\\begin{tabular}{}{}?ig
s?<\/table.*>?\\end{tabular}{}{}?ig

#-----------#
# TABLE ROW #
#-----------#
# nothing at the beginning of a table row
s?<tr>??ig
# two backslashes at the end of a table row
s?</tr>?\\\\?ig

#--------------#
# TABLE COLUMN #
#--------------#
s?<td.*>?\&?ig

#-------#
# FONTS #
#-------#
s?<b>\([^<]*\)</b>?\\textbf{{\1}}?ig
s?<em>\([^<]*\)</em>?\\textit{{\1}}?ig
s?<font .*>??ig
s?</font>??ig
s?<br>?////?g

#--------#
# BUTTON #
#--------#
# guessing on button syntax here
s?<input
type="button".*value="\([^<]*\)">?\\begin{fbox}\1\\end{fbox}?ig

# need to do something here to handle multiline mode
s?<select.*<option.*selected>\([^<]*\)</option>?\\begin{fbox}{\1}\\end{fbox}?g

# delete all other option tags
#?<option.*</option>?d

# handle preformatted things
s?<pre>?\\begin{verbatim}?ig
s?</pre>?\\end{verbatim}?ig

s?<code>?\\begin{verbatim}?ig
s?</code>?\\end{verbatim}?ig

# handle bulleted lists.
# todo: fix "itemize" vs. "enumerate"
s?<ol.*>?//begin{enumerate}?ig
s?</ol.*>?//end{enumerate}?ig
s?<ul.*>?//begin{enumerate}?ig
s?</ul.*>?//end{enumerate}?ig
s?<li>\([^<]*\)</li>?\\item {\1}?g
s?<li>\([^<]*\).*$?\\item {\1}?g
s?</li>??g

s?<!--\([^<]*\)-->?\\begin{comment}{\1}\\end{comment}?ig
