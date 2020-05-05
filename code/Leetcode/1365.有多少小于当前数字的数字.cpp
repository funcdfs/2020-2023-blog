/*
 * @lc app=leetcode.cn id=1365 lang=cpp
 *
 * [1365] 有多少小于当前数字的数字
 */

// @lc code=start

#include <iostream>
#include <vector>
using namespace std;
class Solution
{
public:
    //可以对每一个元素都遍历一遍并同时进行统计，也可以排序完成后输出对应下标
    vector<int> smallerNumbersThanCurrent(vector<int> &nums)
    {
        vector<int> result;
        vector<int> tem;
        for (int i = 0; i < nums.size(); i++)
        {
            tem.push_back(nums.at(i));
        }
        for (int i = 0; i < nums.size() - 1; i++)
        {
            for (int j = 0; j < nums.size() - i - 1; j++)
            {
                if (nums[i] < nums[j])
                {
                    int swap = nums[j];
                    nums[j] = nums[i];
                    nums[i] = swap;
                }
            }
        } //冒泡排序和依次对每个元素进行遍历都是O^2的复杂度
        for (int i = 0; i < nums.size(); i++)
        {
            for (int j = 0; j < nums.size(); j++)
            {
                if (nums[i] == tem[j])
                {
                    result.push_back(j);
                }
            }
        }
        return result;
    }
};
// @lc code=end
