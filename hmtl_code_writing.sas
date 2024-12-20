%let server = https://canada.viya4.sasdemo.ca;
%let jobpath = %str(/Public/ChrisS/CRA/save_data_from_VA_v3);
%let gitpath = %str(C:\Users\cancss\OneDrive - SAS\Documents\GitHub\sascisdemo);

data _null_;
file "&gitpath.\ZZZv0.html";
	put "<!doctype html>";
	put "<html>";
	put "<head>";
	put "<title>SAS Visual Analytics Custom Data Table</title>";
	put "  <script type=""text/javascript"" src=""util/messagingUtil.js""></script>";
 	put "<body>";
    put "</body> ";
	put "</html> ";
run;

data _null_;
   n = git_status("&gitpath.");
   rc = git_index_add("&gitpath.", "ZZZv0.html", "New");
   rc = git_status_free("&gitpath.");
   n = git_status("&gitpath.");
run;

/*data _null_;*/
/* rc = gitfn_commit(*/
/*    "&gitpath.",*/
/*    "ZZZv0.html",*/
/*    "chrissammut11",*/
/*    "chris.sammut@sas.com",*/
/*    "commit via code");*/
/*   put rc=;*/
/*run;*/

data _null_;
 rc = git_commit(                   	 /*1*/
    "&gitpath.",          /*2*/
    "HEAD",          									 /*3*/
    "chrissammut11",                      /*4*/
    "chris.sammut@sas.com",                     /*5*/
    "commit via SAS code");           /*6*/
   put rc=;
run;

data _null_;
   rc = git_push(
      "&gitpath.",
      "chrissammut11",
      "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");
   put rc=;
run;