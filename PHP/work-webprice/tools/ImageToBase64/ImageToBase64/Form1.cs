using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace ImageToBase64
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            //打开文件对话框
            this.openFileDialog1.Filter = "*.jpg|*.png|所有文件(*.*)|*.*";
            if (this.openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    string picpath = this.openFileDialog1.FileName;

                    string result = string.Empty;
                    if (System.IO.File.Exists(picpath))
                    {
                        System.IO.FileStream fs = new System.IO.FileStream(picpath, System.IO.FileMode.Open, System.IO.FileAccess.Read);

                        //初始化一个长度正好的二进制数组imageBytes   

                        Byte[] imageBytes = new byte[fs.Length];

                        //从流中读取全文，并写入二进制数组imageBytes中   

                        fs.Read(imageBytes, 0, Convert.ToInt32(fs.Length));
                        result = System.Convert.ToBase64String(imageBytes, 0, Convert.ToInt32(fs.Length));
                        //记得释放流   

                        fs.Flush();

                        fs.Close();

                        //返回imageBytes   

                    }
                    this.textBox1.Text = result;
                }
                catch (Exception) { }
            }
        }
    }
}
