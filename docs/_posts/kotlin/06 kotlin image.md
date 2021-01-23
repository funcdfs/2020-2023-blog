---
title: kotlin-
draft: true
---


在当前项目中输出一个100x100px的紫色图片

``` kt 
import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO

fun main(args: Array<String>) {
    //在内存中生成一个图片
    var image = BufferedImage(100, 100, BufferedImage.TYPE_INT_BGR)
    var w = 0..99
    var h = 0..99
    image.setRGB(0, 0, 133)
    image.apply {
        for (i in w) {
            for (j in h) {
                setRGB(i, j, 0x9400D3)
            }
        }
    }
    ImageIO.write(image, "bmp", File("a.bmp"))
}
```

