<script>
import classnames from 'classnames';

export default {
    name: 'alert',
    data() {
        return {
            a: 'aa'
        };
    },
    props: {
        btn: {
            validator: function(value) {
                switch (value) {
                    case 'none':
                    case 'both':
                    case 'ensure':
                    case 'cancel':
                        return true;
                    default:
                        return false;
                }
            },
            default: 'both'
        },
        title: {
            type: String,
            default: ''
        },
		body: {
            type: String,
            default: ''
        },
		show: {
            type: Boolean,
            default: false
        },
		ensureBtnTxt: {
            type: String,
            default: '确定'
        },
		cancelBtnTxt: {
            type: String,
            default: '取消'
        },
		showTitle: {
            type: Boolean,
            default: true
        },
        showBody: {
            type: Boolean,
            default: true
        },
        onEnsure: {
            type: Function
        },
        onCancel: {
            type: Function
        }
    },
    methods: {
        clkEnsure(e) {
            e.stopPropagation();
            e.preventDefault();
            if (this.onEnsure instanceof Function) {
                this.onEnsure(e);
            }
            this.closeAlert();
        },
        clkCancel(e) {
            e.stopPropagation();
            e.preventDefault();
            if (this.onCancel instanceof Function) {
                this.onCancel(e);
            }
            this.closeAlert();
        },
        closeAlert(e) {
            this.$emit('onClosing');
        },
        // 生成按钮
        genBtn() {
            let type = this.btn;
            if (type == 'none') {
                return null;
            }
            if (type == 'both') {
                return (
                    <div class='btn-box'>
                        <div class='btn-ensure' onClick={this.clkEnsure.bind(this)}>{this.ensureBtnTxt}</div>
                        <div class='btn-cancel' onClick={this.clkCancel.bind(this)}>{this.cancelBtnTxt}</div>
                    </div>
                );
            }
            if (type == 'cancel') {
                return (
                    <div class='btn-box'>
                        <div class='btn-cancel' onClick={this.clkCancel.bind(this)}>{this.cancelBtnTxt}</div>
                    </div>
                );
            }
            if (type == 'ensure') {
                return (
                    <div class='btn-box'>
                        <div class='btn-ensure' onClick={this.clkEnsure.bind(this)}>{this.ensureBtnTxt}</div>
                    </div>
                );
            }

        },
    },
    
    created() {
    },
	render() {
		return (
			<article class={classnames('barrier', {'hide': !this.show})} onClick={this.closeAlert.bind(this)}>
				<section class='ctn'>
				{
					this.showTitle ? 
					<div class="title">
						{this.title}
					</div> : null
				}
				{
					this.showBody ? 
					<div class="body">
						{this.body}
					</div> : null
				}
				{
					this.genBtn()
				}
					

					
				</section>
			</article>
		);
	}
}
</script>

<style lang="scss" scoped>
.barrier {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0, 0.3);
	z-index: 9999;
}
.ctn {
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	margin: auto;
	border-radius: 8px;
	width: 300px;
	background: #fefefe;
	text-align: center;
	transform: translate3d(0,-50%,0);
	> div:first-child {
		padding: 10px 20px;
	}
	> div:nth-child(2) {
		padding: 0 20px 8px;
	}
	> .title {
		font-size: 20px; /*px*/
		font-weight: bold;
		color: #ff4a69;
	}
	> .body {
		font-size: 16px; /*px*/
		color: #828282;
		&:first-child {
			padding: 16px 30px;
		}
	}
	> .btn-box {
		display: flex;
		height: 72 px; /*px*/
		border-top: 1px solid #eee; /*no*/
		line-height: 40px; /*px*/
		font-size: 16px; /*px*/
        cursor: pointer;
		> .btn-ensure {
			flex: 1 1;
			color: #ff4a69;
		}
		> .btn-cancel {
			flex: 1 1;
			color: #666;
		}
		> div:nth-child(2) {
			border-left: 1px solid #eee; /*no*/
		}
	}
}
</style>
