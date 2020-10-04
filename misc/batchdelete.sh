#!/bin/bash
# Note to self!
# Run this relative to the dbbatchdeleter dir.
#
touch loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_CED.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_GCCSA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_LGA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_POA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_RA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SA2.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SA3.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SA4.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SED.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SOS.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SOSR.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SSC.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_STE.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_SUA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04A_AUS_UCL.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_CED.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_GCCSA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_LGA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_POA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_RA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SA2.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SA3.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SA4.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SED.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SOS.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SOSR.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SSC.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_STE.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_SUA.csv.json >> loadOutput.txt
./dbbatchdeleter -n DPA_01 -d -f ../csvtransform/out_json/2016Census_G04B_AUS_UCL.csv.json >> loadOutput.txt
