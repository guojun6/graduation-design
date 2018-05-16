<template>
    <div class="chemistry">
        <div class="container">
            <div class="header">
                <h1>第一虚拟课堂--化学相关实验介绍</h1>
            </div>

        </div>
        <entry/>
        <div class="container1">
            
            <div class="intro">
            <p>化学实验设计指实验者在实施化学实验前，根据一定的化学实验目的和要求，运用化学知识与技能，
            按照一定的实验方法对实验的原理、仪器、装置、步骤和方法等进行合理安排与规划。</p>
            <p>
                化学实验不仅需要较为扎实的化学知识与实验技能，而且还必须掌握相关的科学方法（如假
                设、测定、实验条件的控制、实验观察与记录、实验结果处理与表达等），因此该类实验很好地
                考查学生灵活应用化学知识与技能以及科学研究方法解决化学问题的能力和创造能力。
            </p>
            
        </div>
        </div>

        <div class="lab2">
            <div class="lab2_intro clearfix">
                <div class="lab2_left">
                    <h3 class="title1">有机化学实验</h3>
                    <p class="desc">
                        在有机合成实验中存在着一些有危险、有污染的实验，制约了学生对于一些化学基础知识的掌握，
                        以及高素质人才的培养。虚拟仿真实验教学的发展，改变了传统的只依靠化学实验室，依赖仪器
                        的实验模式，虚拟仿真化学实验教学项目的建设可以实现真实实验不具备或难以完成的教学功能。
                        所以，针对常规实验项目中污染性强，有毒有害的有机合成实验，我们开发了多个虚拟仿真实验项目。
                    </p>
                </div>
                <div class="lab2_right">
                    
                <img src="./img/chemistry/ch01.jpg" alt="elect1" style="width:600px;height:300px;">
                </div>
            </div>
        </div>

        <div class="lab3">
            <div class="lab3_intro clearfix">
                
                <div class="lab3_left">
                <img src="./img/chemistry/ch02.jpg" alt="lamp" style="width:400px;height:200px;">
                </div>
                <div class="lab3_right">
                    <h3 class="title1">无机化学实验</h3>
                    <p class="desc">
                        一些无机合成实验制备原料有毒，并且重金属无机元素对水环境有污染。为此，我们设计并建设了
                        系列针对无机合成实验的虚拟仿真实验项目
                    </p>
                </div>
            </div>
            
        </div>

        <div class="lab2">
            <div class="lab2_intro clearfix">
                <div class="lab2_left">
                    <h3 class="title1">分析化学实验</h3>
                    <p class="desc">
                        针对分析化学实验中容易造成污染的实验项目，设计成虚拟仿真实验项目，作为真实实验的补充，虚、实结合，
                        让学生反复模拟熟悉连续滴定的实验流程及终点判断，减少环境污染。
                    </p>
                </div>
                <div class="lab2_right">
                    
                <img src="./img/chemistry/ch03.jpg" alt="elect1" style="width:400px;height:200px;">
                </div>
            </div>
        </div>
        
        <div class="lab3">
            <div class="lab3_intro clearfix">
                
                <div class="lab3_left">
                <img src="./img/chemistry/ch04.jpg" alt="lamp" style="width:400px;height:200px;">
                </div>
                <div class="lab3_right">
                    <h3 class="title1">物理化学实验</h3>
                    <p class="desc">
                        近年来，物化实验的仪器越来越先进，同时也越来越像一个黑箱，学生只能掌握到现有
                        仪器的使用方法，却对仪器的工作原理和如何设计实验不甚了解。特别是对于真实实验
                        难以完成复杂的热力学、动力学反应等，制约了学生对于相关化学知识的理解。将部分
                        物理化学实验设计成虚拟仿真实验，可以使微观过程可视化，让学生进一步理解复杂
                        热力学实验的微观反应原理。
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
	/*margin-top: 100px;*/
}
.title1{padding: 10px;margin-bottom:50px;font-size: 24px;}
.desc{padding: 10px;font-size: 16px;line-height: 1.8;}
.lab2{
	background: #f2f2f2;width: 100%;
    padding: 20px 0;
}
.lab2_intro{
    position: relative;
	margin: 0 auto;
}
.lab2_left{
	width: 50%;
	float: left;
	height: 100%;
}
.lab2_right{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
	width: 50%;
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
.lab3_left{width:50%;}
.lab3_right{width:50%;height:100%;margin-left: 50%}
</style>
