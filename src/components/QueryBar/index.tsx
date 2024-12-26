import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'

type QueryBarField = {
  name: string
  label: string
  type: 'input' | 'select' | 'dateRange'
  options?: Array<{ label: string; value: string | number }>
}

type QueryBarProps = {
  fields: QueryBarField[]
  onSearch: (values: unknown) => void
  onReset?: () => void
}

const QueryBar: React.FC<QueryBarProps> = ({ fields, onSearch, onReset }) => {
  const [form] = Form.useForm()
  const [expanded, setExpanded] = useState<boolean>(false)
  const visibleFields = expanded ? fields : fields.slice(0, 2)

  const handleReset = () => {
    form.resetFields()
    if (onReset) onReset()
  }

  const handleSearch = () => {
    form.validateFields().then(values => {
      const formattedValues = { ...values }
      Object.keys(values).forEach(key => {
        if (Array.isArray(values[key]) && values[key][0]?._isAMomentObject) {
          formattedValues[key] = values[key].map(date => date?.format('YYYY-MM-DD'))
        }
      })
      onSearch(formattedValues)
    })
  }

  // TODO: 时间区间选择框
  return (
    <Form form={form} layout="vertical" name="query-bar">
      <Row gutter={24}>
        {visibleFields.map(field => (
          <Col span={8}>
            <Form.Item name={field.name} label={field.label}>
              {/* 输入框 */}
              {field.type === 'input' && <Input placeholder={`请输入${field.label}`} />}
              {/* 下拉框 */}
              {field.type === 'select' && (
                <Select placeholder={`请选择${field.label}`}>
                  {field.options?.map(option => (
                    <Select.Option value={option.value} key={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
              {field.type === 'dateRange' && <DatePicker.RangePicker style={{ width: '100%' }} />}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Row justify="end" gutter={16}>
        <Col>
          <Button onClick={handleReset}>重置</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Col>
        {fields.length > 2 && (
          <Col>
            <Button type="link" onClick={() => setExpanded(!expanded)}>
              {expanded ? '收起' : '展开'}
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  )
}

export default QueryBar
