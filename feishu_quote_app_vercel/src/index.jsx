
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function QuoteUploadPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [files, setFiles] = useState({ stp: [], drawings: [], techdocs: [] });

  useEffect(() => {
    setCustomers(['良信电器', '亿迈齿轮', '京硅智能', '其他客户']);
  }, []);

  const handleFileUpload = (e, type) => {
    const fileList = Array.from(e.target.files);
    setFiles(prev => ({ ...prev, [type]: [...prev[type], ...fileList] }));
  };

  const handleSubmit = () => {
    if (!selectedCustomer || files.stp.length === 0) {
      alert('客户和3D图纸为必填项');
      return;
    }

    console.log('提交数据：', { customer: selectedCustomer, files });
    alert('提交成功，等待AI分析...');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>新建报价任务</h2>

      <label>客户名称：</label>
      <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
        <option value="">请选择客户</option>
        {customers.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div style={{ marginTop: '1rem' }}>
        <label>上传3D图纸（.stp/.step）：</label><br />
        <input type="file" accept=".stp,.step" multiple onChange={(e) => handleFileUpload(e, 'stp')} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>上传2D图纸（.pdf/.dxf）：</label><br />
        <input type="file" accept=".pdf,.dxf" multiple onChange={(e) => handleFileUpload(e, 'drawings')} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>上传技术文档（.pdf/.docx）：</label><br />
        <input type="file" accept=".pdf,.docx" multiple onChange={(e) => handleFileUpload(e, 'techdocs')} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={handleSubmit}>提交并进入分析</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<QuoteUploadPage />);
