/*
 * @lc app=leetcode.cn id=1252 lang=cpp
 *
 * [1252] 奇数值单元格的数目
 */

// @lc code=start
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution
{
public:
    int oddCells(int n, int m, vector<vector<int>> &indices)
    {
        int result = 0;
        vector<vector<int>> init;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                init.at(i).push_back(0);
        //初始化模板数组

        for (int i = 0; i < indices.size(); i++)
            init.at(indices.at(i).at(0)).at(indices.at(i).at(1)) += 1;
        //执行加等1的操作

        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                if (init.at(i).at(j) % 2 != 0)
                    result++;
        //全部执行完毕后判断模板数组是否为奇数

        return result;
    }
};
// @lc code=end
