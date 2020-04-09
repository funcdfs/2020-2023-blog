#include <iostream>
#include <string.h>
using namespace std;
#define maxn 20
enum dir
{
    up,
    down,
    lefft,
    rright
};
struct pos
{
    int x;
    int y;
} pos;
int a[maxn][maxn];
int main()
{
    int n = 0;
    cin >> n;
    pos.x = 0;
    pos.y = n - 1;
    dir direction = down;
    for (int i = 0; i < n * n; i++)
    {
        a[pos.x][pos.y] = i + 1;
        switch (direction)
        {
        case down:
            if (pos.y == n - 1 || a[pos.x][pos.y + 1] != 0)
            {
                direction = lefft;
                pos.x -= 1;
            }
            else
            {
                pos.y += 1;
            }
            break;

        case up:
            if (pos.y == 0 || a[pos.x][pos.y - 1] != 0)
            {
                direction = rright;
                pos.x += 1;
            }
            else
            {
                pos.y -= 1;
            }
            break;
        case lefft:
            if (pos.x == 0 || a[pos.x - 1][pos.y] != 0)
            {
                direction = up;
                pos.y -= 1;
            }
            else
            {
                pos.x -= 1;
            }
            break;
        case rright:
            if (pos.x == n - 1 || a[pos.x + 1][pos.y] != 0)
            {
                direction = down;
                pos.y += 1;
            }
            else
            {
                pos.x += 1;
            }
            break;

        default:
            break;
        }
    }
    for (int i = 0; i < 10; i++)
    {
        for (int j = 0; j < 10; j++)
        {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
