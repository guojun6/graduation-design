<script>
import classnames from 'classnames';

export default {
    name: 'toast',
    data() {
        return {
            show: false,
            timer: undefined
        }
    },
    props: {
        showTime: {
            type: Number,
            default: 0
        }, // 时间戳 传入不同的时间戳则显示
		txt: {
            default: ''
        }
    },
    watch: {
        showTime(val, oldVal) {
            if (val == oldVal) {
                return;
            }
            this.show = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.show = false;
            }, 2000);
        }
    },
    render() {
		return (
			<div class={classnames('ctn', this.show ? 'show' : '')}>
				<p class={'txt'}>{this.txt}</p>
			</div>
		);
	}
};
</script>

<style lang="scss" scoped>
.ctn {
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	margin: auto;
	width: 220px;
	padding: 10px 20px;
	z-index: -1;
	transform: translate3d(0,-50%,0);
	color: #f0f0f0;
	font-size: 18px; /*px*/
	text-align: center;
	background: rgba(33,33,33,0.8);
	transition: opacity 0.8s ease;
	border-radius: 8px;
	opacity: 0;
	&.show {
		opacity: 1;
		z-index: 9999;
	}
}
</style>
