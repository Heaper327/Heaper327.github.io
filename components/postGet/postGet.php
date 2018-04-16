<?php
	function postGet ($filename, $callBack){
		if ($filename=="" || $callBack==""){
			return -1;
		}
		$p_file=fopen ($filename,'r');
		if (!$p_file){
			return -1;
		}
		$start=0;
		$end=0;
		while (true){
			if (fgetc($p_file)==""){
				break;
			}
			fseek($p_file,-1,SEEK_CUR);
			while (true) {
				$tmp = fgetc($p_file);
				if ($tmp=="{"){
					$start=ftell($p_file);
				}
				elseif ($tmp=="}") {
					$end=ftell($p_file);
					break;
				}
			}
			fseek($p_file, $start);
			$callBack (fread($p_file,$end-$start-1));
			fseek($p_file, $end);
		}
		fclose(p_file);
		return 0;
	}
	fileRead ('test.txt',$display);
?>