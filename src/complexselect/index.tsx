import { ColProps, Select, SelectProps, Form } from 'antd'
import { FormLayout } from 'antd/lib/form/Form'
import { FC, useMemo, useState, useEffect } from 'react'

const { Option } = Select
const { Item } = Form

interface ComplexSelectOptions {
    value: string | number;
    label: string;
    children?: ComplexSelectOptions[];
}

interface IProps {
    items: {
        title: string;
        fieldProps?: SelectProps<any>;
    }[];
    options: ComplexSelectOptions[];
    layout: FormLayout;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    value?: Array<number | string>;
    onChange?(value: Array<number | string>): void;
}
const ComplexSelect: FC<IProps> = ({
    value,
    items,
    layout,
    labelCol,
    wrapperCol,
    options,
    onChange,
}) => {
    const [values, setValues] = useState<Array<number | string>>([]);
    const optionsAll = useMemo<Record<string, ComplexSelectOptions[]>>(() => {
        const _options: Record<string, ComplexSelectOptions[]> = {
            0: options,
        }
        let tmp = options;
        for (let i = 0; i < values.length; i++) {
            const v = values[i];
            const _tmp = tmp.find((k) => k.value === v);
            if (_tmp && _tmp.children) {
                _options[i + 1] = _tmp.children;
                tmp = _tmp.children;
            }
        }
        return _options;
    }, [options, values])

    const change = (v: string | number, index: number) => {
        // 清空index索引之后的选项
        const _values = [...values].slice(0, index);
        _values[index] = v;
        setValues(_values);
        if (typeof onChange === 'function') onChange(_values);
    };

    useEffect(() => {
        if (value) setValues(value);
        else setValues([]);
    }, [value])

    return (
        <div>
            <Form layout={layout ?? 'horizontal'}>
                {(items || []).map((v, i) => (
                    <Item
                        key={v.title}
                        label={v.title}
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                    >
                        <Select
                            {...v.fieldProps}
                            value={values[i]}
                            onChange={(v: string | number) => change(v, i)}
                        >
                            {(optionsAll[i] || []).map((v, o) => (
                                <Option
                                    key={`${v}-${o}`}
                                    value={v.value}
                                >
                                    {v.label}
                                </Option>
                            ))}
                        </Select>
                    </Item>
                ))}
            </Form>
        </div>
    )
}
export default ComplexSelect;
