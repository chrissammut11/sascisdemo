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