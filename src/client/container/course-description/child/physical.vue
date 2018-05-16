<template>
    <div class="physical">
        <div class="container">
            <div class="header">
                <h1>第一虚拟课堂--物理相关实验介绍</h1>
            </div>

        </div>

        <entry/>
        
        <div class="container1">
            
            <div class="intro">
            <p>物理是门实验的科学，物理定律的发现无不依赖实验。物理学习当然也离不开实验。
            在目前的物理实验教学中，由于实验仪器复杂、精密与昂贵，往往不能允许学生自行设计
            实验参数、反复调整仪器，这对学生自行设计实验参数、反复调整仪器，这对学生剖析仪
            器性能和结构、理解实验的设计思想和方法是很不利的。物理仿真实验可在相当程度上弥
            补实验教学上这方面的缺陷。</p>
            <p>
                物理实验室所做的实验是初高中阶段物理课程中包含的相关实验，包括电学实验、力
                学实验、热学实验、光学实验等等，常用于验证物理学科的定理定律。
            </p>
            

        </div>
        </div>

        <div class="lab2">
            <div class="lab2_intro clearfix">
                <div class="lab2_left">
                    <h3 class="title1">电学实验</h3>
                    <p class="desc">
                        《仿真电学实验室》是面向中学物理课堂,学生和物理教师的一个全开放性的电学实验仿真
                        平台.与常规的物理教学软件所不同,《仿真电学实验室》不是单纯的演示几个现成的实验.
                        我们的目标是为您提供一个电子元件完备的电学实验室,您可以亲自动手创建您所能想象的
                        所有电学实验.《仿真电学实验室》为您提供了电源、电阻、仪表、开关、输出、其它等六
                        大类电子元件,数十种具体的电子元件.您可以应用这些电子元件,搭建您自己的电路.连接
                        串联与并联电路、用伏安法测试电阻、测量路端电压、用惠斯通电桥精确测量电阻、用电磁
                        继电器实现对电路的简单控制.实验室还为您提供了,灯泡、电铃等元件,让您设计的电路生
                        动活泼.它是一个不可多得的物理教学与学习工具.
                    </p>
                </div>
                <div class="lab2_right">
                    
                <img src="./img/physical/phy01.png" alt="elect1" style="width:600px;height:300px;">
                </div>
            </div>
        </div>

        <div class="lab3">
            <div class="lab3_intro clearfix">
                
                <div class="lab3_left">
                <img src="./img/physical/phy02.jpg" alt="lamp" style="width:600px;height:300px;">
                </div>
                <div class="lab3_right">
                    <h3 class="title1">力学实验</h3>
                    <p class="desc">
                        理论力学虚拟实验室集基础力学的概念、理论、方法在工程实际中应用于一体，把生活中、工程中、科研中与力学
                        密切相关的问题用建模、计算、实验、仿真、视频的形式展示，使低年级学生自始至终进行感知、探索地学习。结
                        构分析实验室，利用虚拟网络可以模拟材料和结构的受力和破坏全过程，使真实实验中难以完成的功能或高成本、
                        高消耗、超大构件的综合训练项目得到了实现。
                    </p>
                </div>
            </div>
            
        </div>

        <div class="lab2">
            <div class="lab2_intro clearfix">
                <div class="lab2_left">
                    <h3 class="title1">热学实验</h3>
                    <p class="desc">
                        热学实验是物理学专业独立开设的一基础物理实验课程，是物理学专业的专业基础课。热学实验是对量热学、
                        热膨胀、相变、气态变化等热现象及其基本规律的验证为主要研究内容。与力学实验相比，热学实验具有自己
                        的规律及特点，其实验误差主要是系统误差。在实验中，因测温和散热所引起的误差是实验误差的主要方面。
                        通过实验教学，使学生加深对热学基本理论和基本规律的认识；掌握基本量，热量、温度、比热容、压强的测
                        量、能分析实验系统误差
                    </p>
                </div>
                <div class="lab2_right">
                    
                <img src="./img/physical/phy03.jpg" alt="elect1" style="width:600px;height:300px;">
                </div>
            </div>
        </div>
        
        <div class="lab3">
            <div class="lab3_intro clearfix">
                
                <div class="lab3_left">
                <img src="./img/physical/phy04.jpg" alt="lamp" style="width:600px;height:300px;">
                </div>
                <div class="lab3_right">
                    <h3 class="title1">光学实验</h3>
                    <p class="desc">
                        光学实验中有许多简单易做的科学小实验，实验材料在日常生活中都很常见，通过虚拟操作的展示，让学生玩转
                        实验，走近科学！“看，这样就行了！”实验可以激发孩子们发现和认识各种自然现象的兴趣，孩子们通过亲自动手来
                        体验化学，了解物理，让科学变得触手可及！
                    </p>
                </div>
            </div>
            
        </div>
    </div>
    
</template>

<script>
import entry from './components/entry';

export default {
    components: {
        [entry.name]: entry
    }
};
</script>

<style scoped>
.clearfix:after{content:"";display:block;height:0;clear:both;visibility: hidden;}
.clearfix{zoom:1;}
.container{width:100%;height:100px;background:#f2f2f2;z-index:12;}
.header{padding: 0 20px; margin:0 auto;line-height:100px;}
.header h1{
    font-size: 22px;
    font-weight: bold;
}
.container1{background:#f2f2f2;}
.intro{
    padding: 20px 10px 10px;
	margin: 0 auto;
	height: 150px;
	font-size: 16px;
	line-height: 1.8;
	/*margin-top: 40px;*/
}
.title1{padding: 10px;margin-bottom:50px;font-size: 24px;}
.desc{padding: 10px;font-size: 16px;line-height: 1.8;}
.lab2{
	background: #f2f2f2;width: 100%;
}
.lab2_intro{
    position: relative;
	margin: 0 auto;
}
.lab2_left{
	width: 33.33%;
	float: left;
	height: 100%;
}
.lab2_right{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
	width: 66.6%;
	float: right;
    text-align: right;
    overflow: hidden;
}
.lab3{background:#18191E;width:100%;padding: 20px 0;}
.lab3_intro{position: relative; margin:0 auto;color:#fff;}

.lab3_left,.lab3_right{float:left;}
.lab3_left {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
}
.lab3_left{width:66.6%;}
.lab3_right{width:33.3%;height:100%;margin-left: 66.6%}
</style>
