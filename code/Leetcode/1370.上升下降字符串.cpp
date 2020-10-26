/*
 * @lc app=leetcode.cn id=1370 lang=cpp
 *
 * [1370] 上升下降字符串
 */

// @lc code=start
#include <iostream>
using namespace std;

class Solution {
   public:
    string sortString(string s) {
        //双重循环拼接最小元素，双重循环最大元素，两个循环外套一次while循环
        string ans = {""};
        char mini = s.at(0);
        for (int i = 0; i < s.size(); i++) {
            if (s.at(i) < mini) {
                mini = s.at(i);
                s.erase();
            }
        }
        ans.push_back(mini);
    }
};
// @lc code=end
