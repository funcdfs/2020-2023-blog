---
title: Docker 常用命令
date: 2021-11-16
tags:
  - Docker
---

将当前用户添加到 docker 用户组
为了避免每次使用 docker 命令都需要加上 sudo 权限，可以将当前用户加入安装中自动创建的 docker 用户组（可以参考 [官方文档](https://docs.docker.com/engine/install/linux-postinstall/)）

``` sh
sudo usermod -aG docker $USER
```

`docker->image->container`

docker version 查看 docker 是否安装完成

## 镜像（images）

- `docker pull ubuntu:20.04`：拉取一个镜像 docker pull 命令就是拉取一个镜像，注意镜像是名字冒号加上版本号
- `docker images` : 列出本地的所有镜像
- `docker image rm ubuntu:20.04` 或 `docker rmi ubuntu:20.04`：删除镜像 ubuntu:20.04
- `docker [container] commit CONTAINER IMAGE_NAME:TAG`：创建某个 container  的镜像
- `docker save -o ubuntu_20_04.tar ubuntu:20.04`：将镜像 ubuntu:20.04 导出到本地文件 ubuntu_20_04.tar 中 （用 scp 在不同服务器中传送 tar 数据包）
- `docker load -i ubuntu_20_04.tar`：将镜像 ubuntu:20.04 从本地文件 ubuntu_20_04.tar 中加载出来，将一个 tar 变成一个 image

## 容器 (container)

`[container]` 意思是使用命令的时候这个字段可选，一般使用的时候不加这个参数

- `docker [container] create -it ubuntu:20.04` 利用镜像 ubuntu:20.04 创建一个容器。根据一个模板创建出来一个服务器（容器），一个镜像可以创建很多个容器
- `docker ps -a`：查看本地的所有容器，不加 -a 就是显示所有正在运行的容器
- `docker [container] start CONTAINER`：启动容器， container 的位置可以加 ID，也可以加容器名字
- `docker [container] stop CONTAINER`：停止容器
- `docker [container] restart CONTAINER`：重启容器
- `docker [contaienr] run -itd ubuntu:20.04`：创建并启动一个容器
- `docker [container] attach CONTAINER`：进入容器，相当于进入了一个服务器
  - `ctrl + P ++ ctrl + Q` 退出容器
  - `ctrl + d` 也可以退出容器，但是会将服务器关掉
- `docker [container] exec CONTAINER COMMAND`：在容器中执行命令，只有当容器启动的时候，才可以执行命令， container 的位置填写名字或者 id，command 位置填写你要在这个容器中执行的命令，这个命令会将 执行的结果返回到命令行输出中
- `docker [container] rm CONTAINER`：删除容器， 注意和 rmi 的区别，rmi 删除一个镜像，rm 删除一个容器
- `docker container prune`：删除所有已停止的容器 prune ：动词：修剪，剪裁，修整，精简，缩减
- `docker export -o xxx.rar CONTAINER`：将容器 CONTAINER 导出到本地文件 xxx.tar 中，直接将容器打包，进行导入导出，跳过了打包到镜像的这一步
  - `chmod +r tmp.rar` 为 tmp.tar 增加一个可读权限
- `docker import xxx.tar image_name:tag`：将本地文件 xxx.tar 导入成镜像，并同时将镜像命名为 `image_name:tag`
- `docker export/import` 与 `docker save/load` 的区别：
  - `export/import` 会丢弃历史记录和元数据信息，仅保存容器当时的快照状态
  - `save/load` 会保存完整记录，但是体积更大
- `docker top CONTAINER`：查看某个容器内的所有进程状态，当然也可以先 attach 到 docker 中，使用 top 命令查看，然后在 ctrl p ctrl q 挂起
- `docker stats`：查看所有容器的统计信息，包括CPU、内存、存储、网络等信息
- `docker cp xxx CONTAINER:xxx 或 docker cp CONTAINER:xxx xxx`：在本地和容器间复制文件，就和 scp 在不同服务器之间复制文件一样，只是将 scp 换成了 docker cp
- `docker rename CONTAINER1 CONTAINER2`：重命名容器，如果经常使用的话，就不用那个乱码名字了
- `docker update CONTAINER --memory 500MB`：修改容器限制为 500MB，更多的修改在官网文档

## 新机连接

1. scp 抄一个镜像 tar 到新的服务器
2. ssh 连接到新的服务器
3. `docker load -i dockerDemo_1_0.tar` 将那个镜像加载到 docker 镜像目录中
4. `docker run -p 20000:22 --name my_docker_server -itd dockerlesson:1.0`  创建并运行 `dockerDemo:1.0` 镜像, `-p 20000:22` 是修改端口号映射，将容器中的 22 端口号映射到本地的 20000 端口号，因为本地的 22 端口号已经被用过了，本地需要登录 （服务器需要在网络安全组中放开 20000 端口）
5. `docker attach my_docker_server`
6. `passwd laigeoffer` # 设置这一个 docker server 的 root 用户的密码为 `laigeoffer`
7. `ctrl + p, ctrl + q`, 将这个容器挂起
8. `ssh root@localhost -p 20000` 在这个新的服务器中，就可以使用 ssh 登录新创建的 docker 容器
9. 可以在 `.ssh` 中添加与服务器相同的 ip 地址，但是需要多一行 port 属性，属性值为 20000， 然后 ssh copy id, 别名  
   就可以在本地机，直接连接创建好的 docker，不用再先连到 服务器，在连到 docker
10. `adduser fw` 创建 fw 用户
11. `usermod -aG sudo fw` 为 fw 用户增加 sudo 权限
12. `su fw` 即可正常使用

