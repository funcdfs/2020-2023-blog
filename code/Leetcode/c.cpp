#include <iostream>
#include <vector>

using namespace std;

class Solution {
   public:
    string destCity(vector<vector<string>>& paths) {
        //所有字符串均由大小写英文字母和空格字符组成
        //遍历第二行字符串，若没有相同字符串在所有字符串里出现，就结束程序
        for (int i = 0; i < paths.size(); i++) {
            bool flag = false;
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < paths.size(); k++) {
                    if (paths.at(k).at(j) == paths.at(i).at(1))
                        flag = true;
                }
            }
            if (!flag) {
                return paths.at(i).at(1);
            }
        }
    };
}