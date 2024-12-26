import { Down, Up } from '@icon-park/react'
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd'
import React, { useState } from 'react'

export type QueryFormField = {
  name: string
  label: string
  type: 'input' | 'select' | 'dateRange'
  options?: Array<{ label: string; value: string | number }>
}

type QueryFormProps = {
  fields: QueryFormField[]
  onSearch: (values: unknown) => void
  onReset?: () => void
}

const QueryForm: React.FC<QueryFormProps> = ({ fields, onSearch, onReset }) => {
  const [form] = Form.useForm()
  const [expanded, setExpanded] = useState<boolean>(false)
  const visibleFields = expanded ? fields : fields.slice(0, 3)

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

  return (
    <Form form={form} name="query-bar">
      <Row gutter={[16, 12]} align="middle" wrap>
        {visibleFields.map(field => (
          <Col
            xs={24}
            sm={field.type === 'dateRange' ? 24 : 12}
            md={field.type === 'dateRange' ? 12 : 8}
            lg={field.type === 'dateRange' ? 8 : 6}
          >
            <Form.Item name={field.name} label={field.label} className="mb-0">
              {/* 输入框 */}
              {field.type === 'input' && <Input placeholder={`请输入${field.label}`} />}
              {/* 下拉框 */}
              {field.type === 'select' && (
                <Select placeholder={`请选择${field.label}`} allowClear>
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

        {/* 占位符，确保展开/收起按钮始终对齐 */}
        <Col flex="auto" />

        {/* 操作按钮（搜索、重置、展开/收起） */}
        <Col>
          <Space>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
            {fields.length > 3 && (
              <Button type="link" onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                  <>
                    收起 <Up theme="outline" size="14" fill="#1677FF" />
                  </>
                ) : (
                  <>
                    展开 <Down theme="outline" size="14" fill="#1677FF" />
                  </>
                )}
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export default QueryForm
