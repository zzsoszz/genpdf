/*
 * This file is generated by jOOQ.
*/
package com.veryqy.jooq.tables.pojos;


import java.io.Serializable;

import javax.annotation.Generated;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.10.8"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Row implements Serializable {

    private static final long serialVersionUID = 1751159997;

    private String  seq;
    private String  id;
    private String  subcategory;
    private String  name;
    private String  unit;
    private String  remark;
    private String  subname;
    private String  price;
    private String  count;
    private Boolean checked;
    private String  total;
    private String  orderId;
    private String  commodityId;

    public Row() {}

    public Row(Row value) {
        this.seq = value.seq;
        this.id = value.id;
        this.subcategory = value.subcategory;
        this.name = value.name;
        this.unit = value.unit;
        this.remark = value.remark;
        this.subname = value.subname;
        this.price = value.price;
        this.count = value.count;
        this.checked = value.checked;
        this.total = value.total;
        this.orderId = value.orderId;
        this.commodityId = value.commodityId;
    }

    public Row(
        String  seq,
        String  id,
        String  subcategory,
        String  name,
        String  unit,
        String  remark,
        String  subname,
        String  price,
        String  count,
        Boolean checked,
        String  total,
        String  orderId,
        String  commodityId
    ) {
        this.seq = seq;
        this.id = id;
        this.subcategory = subcategory;
        this.name = name;
        this.unit = unit;
        this.remark = remark;
        this.subname = subname;
        this.price = price;
        this.count = count;
        this.checked = checked;
        this.total = total;
        this.orderId = orderId;
        this.commodityId = commodityId;
    }

    public String getSeq() {
        return this.seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubcategory() {
        return this.subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return this.unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getRemark() {
        return this.remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getSubname() {
        return this.subname;
    }

    public void setSubname(String subname) {
        this.subname = subname;
    }

    public String getPrice() {
        return this.price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCount() {
        return this.count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public Boolean getChecked() {
        return this.checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public String getTotal() {
        return this.total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getOrderId() {
        return this.orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCommodityId() {
        return this.commodityId;
    }

    public void setCommodityId(String commodityId) {
        this.commodityId = commodityId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Row (");

        sb.append(seq);
        sb.append(", ").append(id);
        sb.append(", ").append(subcategory);
        sb.append(", ").append(name);
        sb.append(", ").append(unit);
        sb.append(", ").append(remark);
        sb.append(", ").append(subname);
        sb.append(", ").append(price);
        sb.append(", ").append(count);
        sb.append(", ").append(checked);
        sb.append(", ").append(total);
        sb.append(", ").append(orderId);
        sb.append(", ").append(commodityId);

        sb.append(")");
        return sb.toString();
    }
}