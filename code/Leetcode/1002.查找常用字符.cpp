/*
 * @lc app=leetcode.cn id=1002 lang=cpp
 *
 * [1002] 查找常用字符
 */

// @lc code=start

#include <iostream>
#include <vector>
using namespace std;

class Solution {
   public:
    //返回字符串数组所有的重复字母
    vector<string> commonChars(vector<string>& A) {
        //将一个单词对应的字母出现次数保存下来,
        //然后对第二个单词进行字母次数的映射,
        //将非 0的相同的字母频次保存下来继续进行比较
        //相同继续下一轮，不相同就将对应数字置为 0
        vector<string> result;
        int last_fre[26] = {0};  //上一个单词的字母频次
        int next_fre[26] = {0};
        for (int k = 0; k < A.at(0).size(); k++) {
            last_fre[A.at(0).at(k) - 'a']++;
        }  //初始化字母频次表
        for (int i = 0; i < A.size(); i++) {
            for (int k = 1; k < A.at(i).size(); k++) {
                next_fre[A.at(i).at(k) - 'a']++;
            }
            for (int j = 0; j < 26; j++) {
                if (last_fre[j] != next_fre[j]) {
                    last_fre[j] = 0;
                }
            }
        }
        for (int i = 0; i < 26; i++) {
            if (last_fre[i] != 0) {
                char* a = NULL;
                itoa(last_fre[i], a, 10);
                result.push_back(a);
            }
        }
        return result;
    }
};
// @lc code=end
