/*
MIT License

Copyright (c) 2019 MURATA Mitsuharu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function toEra(date) {
    var era_list = [
        [1868, 1, 1, "明治"],
        [1912, 7, 30, "大正"],
        [1926, 12, 25, "昭和"],
        [1989, 1, 8, "平成"],
        [2019, 5, 1, "令和"]
    ]

    var r
    era_list.some(function(e, i){
        if(new Date(e[0], e[1]-1, e[2]) <= date){
            if(i == era_list.length-1 ){
                r = [
                    era_list[i][3],
                    date.getFullYear() - e[0] + 1,
                    date.getMonth() + 1,
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ]
                return true
            }else{
                if(date < new Date(era_list[i+1][0], era_list[i+1][1]-1, era_list[i+1][2])){
                    r = [
                        e[3],
                        date.getFullYear() - e[0] + 1,
                        date.getMonth() + 1,
                        date.getDate(),
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds()
                    ]
                    return true
                }
            }
        }
    })
    return r
}