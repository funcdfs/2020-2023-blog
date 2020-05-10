/*
 * @lc app=leetcode.cn id=922 lang=cpp
 *
 * [922] 按奇偶排序数组 II
 */

// @lc code=start
#include <iostream>
#include <vector>
using namespace std;

class Solution {
   public:
    vector<int> sortArrayByParityII(vector<int>& A) {
        //用偶数的下标来作为循环的开头刚好不会溢出
        int last_index = 1;
        for (int i = 0; i < A.size(); i += 2) {
            //遇到一个奇数在偶数应该在的位置时
            if (A.at(i) % 2 != 0) {
                //从所有元素中找到一个不在偶数队列中的偶数进行交换
                //也就是从奇数队列中找到第一个偶数进行交换
                for (int j = last_index; j < A.size(); j += 2) {
                    if (A.at(j) % 2 == 0) {
                        last_index = j;  //更新下标
                        swap(A.at(i), A.at(j));
                    }
                }
            }
        }
        return A;
    }
};
// @lc code=end
